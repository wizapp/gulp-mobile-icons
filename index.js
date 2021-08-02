/* jshint node: true */
// @ts-check
'use strict';

const through = require('through2');
const sharp = require("sharp");
const gutil = require('gulp-util');
const PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-mobile-icons';

/**
 * List of all sizes for which PNGs need to be created
 * @type {Object.<string,sharp.ResizeOptions>}}
 */
const SIZES = {
	/** ANDROID **/
	'android-ldpi'   : { width:  36, height:  36 },
	'android-mdpi'   : { width:  48, height:  48 },
	'android-hdpi'   : { width:  72, height:  72 },
	'android-xhdpi'  : { width:  96, height:  96 },
	'android-xxhdpi' : { width: 144, height: 144 },
	'android-xxxhdpi': { width: 196, height: 196 },

	/** iOS **/
	// References:
	// - https://makeappicon.com/ios10icon (good listing)
	// - https://developer.apple.com/ios/human-interface-guidelines/graphics/app-icon/ (canonical source, but usually only for the most recent iOS version)
	/* App icon */
	// iPhone (iOS 5 + iOS 6)
	'ios-57'     : { width:  57, height:  57 },
	// iPhone retina (iOS 5 + iOS 6)
	'ios-57@2x'  : { width: 114, height: 114 },
	// iPad (iOS 5 + iOS 6)
	'ios-72'     : { width:  72, height:  72 },
	// iPad retina (iOS 5 + iOS 6)
	'ios-72@2x'  : { width: 144, height: 144 },
	// iPhone + iPad (non-retina)
	'ios-60'     : { width:  60, height:  60 },
	// iPhone 6s, iPhone 6, iPhone SE
	'ios-60@2x'  : { width: 120, height: 120 },
	// iPhone 6s Plus, iPhone 6 Plus
	'ios-60@3x'  : { width: 180, height: 180 },
	// iPad (non-retina)
	'ios-76'     : { width:  76, height:  76 },
	// iPad, iPad mini
	'ios-76@2x'  : { width: 152, height: 152 },
	'ios-76@3x'  : { width: 228, height: 228 },
	// iPad Pro
	'ios-83.5@2x': { width: 167, height: 167 },

	/* Spotlight */
	// iPad retina (iOS 5 + iOS 6)
	'ios-50@2x'  : { width: 100, height: 100 },
	// iPhone + iPad (non-retina)
	'ios-50'     : { width:  50, height:  50 },
	'ios-40'     : { width:  40, height:  40 },
	// iPhone 6s, iPhone 6, iPhone SE, iPad Pro, iPad, iPad mini
	'ios-40@2x'  : { width:  80, height:  80 },
	// iPhone 6s Plus, iPhone 6 Plus
	'ios-40@3x'  : { width: 120, height: 120 },

	/* Settings */
	// iPhone + iPad (non-retina)
	'ios-29'     : { width:  29, height:  29 },
	// iPhone 6s, iPhone 6, iPhone SE, iPad Pro, iPad, iPad mini
	'ios-29@2x'  : { width:  58, height:  58 },
	// iPhone 6s Plus, iPhone 6 Plus
	'ios-29@3x'  : { width:  87, height:  87 },

	/* Navigation bar and toolbar */
	// iPad
	'ios-20'     : { width:  20, height:  20 },
	// iPhone + iPad (non-retina)
	'ios-22'     : { width:  22, height:  22 },
	// iPhone 6s, iPhone 6, iPhone SE, iPad Pro, iPad, iPad mini
	'ios-22@2x'  : { width:  44, height:  44 },
	// iPhone 6s Plus, iPhone 6 Plus
	'ios-22@3x'  : { width:  66, height:  66 },

	/* Tab bar */
	// iPhone + iPad (non-retina)
	'ios-25'     : { width:  25, height:  25 },
	// iPhone 6s, iPhone 6, iPhone SE, iPad Pro, iPad, iPad mini
	'ios-25@2x'  : { width:  50, height:  50 },
	// iPhone 6s Plus, iPhone 6 Plus
	'ios-25@3x'  : { width:  75, height:  75 },

	// Apple Watch
	'ios-24'   :   { width: 24,  height: 24},
	'ios-24@2x':   { width: 48,  height: 48},
	'ios-27.5@2x': { width: 55,  height: 55},
	'ios-44@2x':   { width: 88,  height: 88},
	'ios-86@2x':   { width: 172, height: 172},
	'ios-98@2x':   { width: 196, height: 196},
	'ios-108@2x':  { width: 216, height: 216},

	// iOS marketing icon
	'ios-marketing': { width: 1024, height: 1024 },

	/** Chrome touch icon **/
	// Reference: https://developer.chrome.com/multidevice/android/installtohomescreen
	'chrome-192': { width: 192, height: 192 },
	'chrome-128': { width: 128, height: 128 }
};

/**
 * 
 * @param {typeof SIZES} sizes 
 * @param {typeof sharp} imageTransform 
 * @returns 
 */
const transform = (sizes, imageTransform) => function (file, encoding, callback) {
	if (file.isStream()) {
		this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
		return callback();
	}

	const promises = Object.keys(sizes).map(name => {
		const size = sizes[name];
		const density = size.width; // the import density needs to be higher if the output size is large!
		return imageTransform(Buffer.from(file.contents), { density: density })
			.resize(sizes[name])
			.flatten({ background: '#FFF' })
			.png().toBuffer()
			.then(png => {
				const result = new gutil.File({
					cwd: './',
					path: `${name}.png`,
					contents: png
				});
				this.push(result);

				return png;
			});
	});

	Promise
		.all(promises)
		.then(() => callback(null))
		.catch(e => console.error(e));
};

/**
 * Creates mobile icons
 * @param  {Object} [sizes=SIZES]    Provide the needed sizes, or use default if not specified.
 * @param  {typeof sharp} [imageTransform=sharp] For testing: avoid expensive calls to sharp
 */
module.exports = function (sizes = SIZES, imageTransform = sharp) {
	return through.obj(transform(sizes, imageTransform));
};

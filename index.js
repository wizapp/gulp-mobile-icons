/* jshint node: true */

'use strict';

const through = require('through2');
const svg2png = require('svg2png');
const gutil = require('gulp-util');
const PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-mobile-icons';

/**
 * List of all sizes for which PNGs need to be created
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
	// For iOS <7
	'ios-57'     : { width:  57, height:  57 },
	// For iOS <7
	'ios-57@2x'  : { width: 114, height: 114 },
	// For iOS <7
	'ios-72'     : { width:  72, height:  72 },
	// For iOS <7
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
	// For iOS <7
	'ios-50@2x'  : { width: 100, height: 100 },

	/* Spotlight */
	// iPhone + iPad (non-retina)
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

	/* Navigation bar and Toolbar */
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

	/** Chrome touch icon **/
	'chrome-touch': { width: 196, height: 196 }
};

const transform = (sizes, imageTransform) => function(file, encoding, callback) {
	if (file.isStream()) {
		this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
		return callback();
	}

	const promises = Object.keys(sizes).map(name => {
		return imageTransform(new Buffer(file.contents), sizes[name])
			.then(png => {
				const result = new gutil.File({
					cwd : './',
					path : `${name}.png`,
					contents: png
				});
				this.push(result);

				return png;
			});
	});

	Promise
		.all(promises)
		.then(()  => callback(null))
		.catch(e => console.error(e));
};

/**
 * Creates mobile icons
 * @param  {Object} [sizes=SIZES]            For testing: reduce number of sizes
 * @param  {Function} [imageTransform=svg2png] For testing: avoid expensive calls to svg2png
 * @return {Stream}
 */
module.exports = function(sizes = SIZES, imageTransform = svg2png) {
	return through.obj(transform(sizes, imageTransform));
};

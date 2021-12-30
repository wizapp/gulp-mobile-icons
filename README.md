# gulp-mobile-icons

Gulp plugin that creates PNG icons for iOS and Android based on a SVG image.

Please read this [blog post](https://medium.com/collaborne-engineering/the-pain-of-producing-mobile-icons-and-splash-screens-and-how-to-get-rid-off-it-b37372618ea0#.up1ljd9r9) for a detailed explanation of the problem that the plugin solves.

## Usage

To use the the plugin in your gulp process:

```javascript
const gulp = require('gulp');
const mobileIcons = require('gulp-mobile-icons');

gulp.task('default', [], function() {
    gulp.src('icon.svg')
        .pipe(mobileIcons())
        .pipe(gulp.dest('images'));
});
```

This will create all icons in the folder `images/`.

If you want to customize the filenames or sizes of the icons, pass an object to `mobileIcons` with the sizes:
```javascript
gulp.task('build_icons', [], function() {
    const MY_SIZES = {
        'icon-57': { width: 57, height: 57 },
        'icon-57@2x': { width: 114, height: 114 },
        'icon-72': { width: 72, height: 72 }
    }
    gulp.src('icon.svg')
        .pipe(mobileIcons(MY_SIZES))
        .pipe(gulp.dest('images'));
});
```

Other options can be set, too:
```javascript
gulp.task('build_icons', [], function() {
    const MY_SIZES = {
        'icon-57': { width: 57, height: 57 },
        'icon-57@2x': { width: 114, height: 114 },
        'icon-72': { width: 72, height: 72 }
    }
    gulp.src('icon.svg')
        .pipe(mobileIcons(MY_SIZES, {
          // Use a white background
          background: '#FFF'
        }))
        .pipe(gulp.dest('images'));
});
```


### Cordova / PhoneGap

Add the following to your `config.xml` to use the icons in a Cordova/PhoneGap application:

```html
<platform name="ios">
    <!-- iOS 8.0+ -->
    <!-- iPhone 6 Plus  -->
    <icon src="images/ios-60@3x.png" width="180" height="180" />
    <!-- iOS 7.0+ -->
    <!-- iPhone / iPod Touch  -->
    <icon src="images/ios-60.png" width="60" height="60" />
    <icon src="images/ios-60@2x.png" width="120" height="120" />
    <!-- iPad -->
    <icon src="images/ios-76.png" width="76" height="76" />
    <icon src="images/ios-76@2x.png" width="152" height="152" />
    <!-- Spotlight Icon -->
    <icon src="images/ios-40.png" width="40" height="40" />
    <icon src="images/ios-40@2x.png" width="80" height="80" />
    <icon src="images/ios-40@3x.png" width="120" height="120" /> <!-- same as 60@2x -->
    <!-- iOS 6.1 -->
    <!-- iPhone / iPod Touch -->
    <icon src="images/ios-57.png" width="57" height="57" />
    <icon src="images/ios-57@2x.png" width="114" height="114" />
    <!-- iPad -->
    <icon src="images/ios-20.png" width="20" height="20" />
    <icon src="images/ios-29.png" width="29" height="29" />
    <icon src="images/ios-72.png" width="72" height="72" />
    <icon src="images/ios-72@2x.png" width="144" height="144" />
    <!-- iPhone Spotlight and Settings Icon -->
    <icon src="images/ios-29.png" width="29" height="29" />
    <icon src="images/ios-29@2x.png" width="58" height="58" />
    <icon src="images/ios-29@3x.png" width="87" height="87" />
    <icon src="images/ios-20@2x.png" width="40" height="40" /> <!-- same as 40@1x -->
    <icon src="images/ios-20@3x.png" width="60" height="60" /> <!-- same as 60@1x -->
    <!-- iPad Spotlight and Settings Icon -->
    <icon src="res/ios/icon-50.png" width="50" height="50" />
    <icon src="images/ios-50@2x.png" width="100" height="100" />
    <!-- iPad Pro -->
    <icon src="images/ios-83.5@2x.png" width="167" height="167" />
    <!-- Apple Watch -->
    <icon src="images/ios-24.png" width="24" height="24" />
    <icon src="images/ios-24@2x.png" width="48" height="48" />
    <icon src="images/ios-27.5@2x.png" width="55" height="55" />
    <icon src="images/ios-44@2x.png" width="88" height="88" />
    <icon src="images/ios-86@2x.png" width="172" height="172" />
    <icon src="images/ios-98@2x.png" width="196" height="196" />
    <icon src="images/ios-108@2x.png" width="216" height="216" />
    <!-- iTunes Marketing Image -->
    <icon src="images/ios-1024.png" width="1024" height="1024" />
</platform>

<platform name="android">
    <icon src="images/android-ldpi.png"    density="ldpi"/>
    <icon src="images/android-mdpi.png"    density="mdpi"/>
    <icon src="images/android-hdpi.png"    density="hdpi"/>
    <icon src="images/android-xhdpi.png"   density="xhdpi"/>
    <icon src="images/android-xxhdpi.png"  density="xxhdpi"/>
    <icon src="images/android-xxxhdpi.png" density="xxxhdpi"/>
</platform>
```

### Web application

When using the app as a web application, you need to add to your `index.html` (see also [Apple documentation](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)):

```html
<!-- iPhone -->
<link rel="apple-touch-icon" href="images/ios-60@2x.png">
<!-- iPhone retina -->
<link rel="apple-touch-icon" sizes="180x180" href="images/ios-60@3x.png">
<!-- iPad -->
<link rel="apple-touch-icon" sizes="152x152" href="images/images/ios-76@2x.png">
<!-- iPad retina -->
<link rel="apple-touch-icon" sizes="167x167" href="images/ios-83.5@2x.png">
<!-- Chrome -->
<link rel="icon" sizes="192x192" href="images/chrome-192.png">
<link rel="icon" sizes="128x128" href="images/chrome-128.png">
```

## Explanation

This [blog post](https://medium.com/collaborne-engineering/take-out-the-pain-of-building-app-icons-249ee03398a4#.l6s7smjmu) explain the implementation details of this plugin.

Sample icon made by [Freepik](http://www.freepik.com) from [www.flaticon.com](http://www.flaticon.com) is licensed by [Creative Commons BY 3.0](http://creativecommons.org/licenses/by/3.0/)

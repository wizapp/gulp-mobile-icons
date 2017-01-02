# gulp-mobile-icons
Gulp plugin that creates PNG icons for iOS and Android based on a SVG image.

## Usage

To use the the plugin in your gulp process:

~~~~
const gulp = require('gulp');
const mobileIcons = require('gulp-mobile-icons');

gulp
    .src('icon.svg')
    .pipe(mobileIcons())
    .pipe(gulp.dest('images'));
~~~~

This will create all icons in the folder `images/`.

### Cordova

Add the following to your `config.xml` to use the icons in a Cordova application:

```html
<!-- Icons for iOS and Android -->
<platform name="ios">
    <icon src="images/ios-57.png" width="57" height="57"/>
    <icon src="images/ios-57@2x.png" width="114" height="114"/>

    <icon src="images/ios-72.png" width="72" height="72"/>
    <icon src="images/ios-72@2x.png" width="144" height="144"/>

    <icon src="images/ios-60.png" width="60" height="60"/>
    <icon src="images/ios-60@2x.png" width="120" height="120"/>
    <icon src="images/ios-60@3x.png" width="180" height="180"/>

    <icon src="images/ios-76.png" width="76" height="76"/>
    <icon src="images/ios-76@2x.png" width="152" height="152"/>
    <icon src="images/ios-76@3x.png" width="228" height="228"/>

    <icon src="images/ios-83.5@2x.png" width="167" height="167"/>

    <icon src="images/ios-50@2x.png" width="100" height="100"/>

    <!-- Small -->
    <icon src="images/ios-40.png" width="40" height="40"/>
    <icon src="images/ios-40@2x.png" width="80" height="80"/>
    <icon src="images/ios-40@3x.png" width="120" height="120"/>

    <!-- Settings -->
    <icon src="images/ios-29.png" width="29" height="29"/>
    <icon src="images/ios-29@2x.png" width="58" height="58"/>
    <icon src="images/ios-29@3x.png" width="87" height="87"/>

    <!-- Toolbar -->
    <icon src="images/ios-22.png" width="22" height="22"/>
    <icon src="images/ios-22@2x.png" width="44" height="44"/>
    <icon src="images/ios-22@3x.png" width="66" height="66"/>

    <!-- Tabbar -->
    <icon src="images/ios-25.png" width="25" height="25"/>
    <icon src="images/ios-25@2x.png" width="50" height="50"/>
    <icon src="images/ios-25@3x.png" width="75" height="75"/>
</platform>

<platform name="android">
    <icon src="images/android-ldpi.png" density="ldpi"/>
    <icon src="images/android-mdpi.png" density="mdpi"/>
    <icon src="images/android-hdpi.png" density="hdpi"/>
    <icon src="images/android-xhdpi.png" density="xhdpi"/>
    <icon src="images/android-xxhdpi.png" density="xxhdpi"/>
    <icon src="images/android-xxxhdpi.png" density="xxxhdpi"/>
</platform>
```

## Explanation

This [blog post](https://medium.com/collaborne-engineering/take-out-the-pain-of-building-app-icons-249ee03398a4#.l6s7smjmu) explain the implementation details of this plugin in detail.

Sample icon made by [Freepik](http://www.freepik.com) from [www.flaticon.com](http://www.flaticon.com) is licensed by [Creative Commons BY 3.0](http://creativecommons.org/licenses/by/3.0/)

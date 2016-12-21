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

# Explanation

This [blog post](https://medium.com/collaborne-engineering/take-out-the-pain-of-building-app-icons-249ee03398a4#.l6s7smjmu) explain the implementation details of this plugin in detail.

Sample icon made by [Freepik](http://www.freepik.com) from [www.flaticon.com](http://www.flaticon.com) is licensed by [Creative Commons BY 3.0](http://creativecommons.org/licenses/by/3.0/)

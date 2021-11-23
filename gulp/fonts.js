// Import external dependences
const { 
  paths
} = require('../package.json');

// Import main dependences
const gulp = require('gulp');

// Import working dependencies
const ttf2eot = require('gulp-ttf2eot');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');

// Import file dependences
const fs = require('fs');

// ttf2woff
const woff = () => {
  return gulp.src( paths.src + '/fonts/*.ttf' )
    .pipe(ttf2woff())
    .pipe(gulp.dest( paths.dist + '/fonts/' ));
};

// ttf2woff2
const woff2 = () => {
  return gulp.src( paths.src + '/fonts/*.ttf' )
    .pipe(ttf2woff2())
    .pipe(gulp.dest( paths.dist + '/fonts/' ));
};

// ttf2eot
const eot = () => {
  return gulp.src( paths.src + '/fonts/*.ttf' )
    .pipe(ttf2eot())
    .pipe(gulp.dest( paths.dist + '/fonts/' ));
};

// Copy ttf
const ttfCopy = () => {
  return gulp.src( paths.src + '/fonts/*.ttf' )
    .pipe( gulp.dest( paths.dist + '/fonts/' ));
};

// Get fonts style
const styles = () => {
  fs.truncate( paths.src + '/scss/_fonts.scss', 0, function () {
    // Clearing the stylesheet with fonts
    fs.writeFile( paths.src + '/scss/_fonts.scss', '', cb);

    // Search fonts
    return fs.readdir( paths.src + '/fonts/', function (err, items) {
      if (items) {
        // Font name
        let c_fontname;

        // Fonts loop
        for (var i = 0; i < items.length; i++) {
          // Clearing the format in the file name
          let fontname = items[i].split('.');


          let style = 'normal', // Normal style
            weight = '400', // Normal weight
            /*
             * Split name by separator - "-"
             * For fonts from https://fonts.google.com/
             * Or fonts which has logical name - Name-WeightStyle.extantion
             */
            name = fontname[0].split('-')[0];


          // Change font weight
          if (fontname[0].includes('Black') || fontname[0].includes('black')) {
            weight = '900';
          } else if (fontname[0].includes('ExtraBold') || fontname[0].includes('extrabold')) {
            weight = '800';
          } else if (fontname[0].includes('SemiBold') || fontname[0].includes('semibold')) {
            weight = '600';
          } else if (fontname[0].includes('Bold') || fontname[0].includes('bold')) {
            weight = '700';
          } else if (fontname[0].includes('Medium') || fontname[0].includes('medium')) {
            weight = '500';
          } else if (fontname[0].includes('-Italic') || fontname[0].includes('-italic') || fontname[0].includes('Regular') || fontname[0].includes('regular')) {
            weight = '400';
          } else if (fontname[0].includes('ExtraLight') || fontname[0].includes('extralight')) {
            weight = '200';
          } else if (fontname[0].includes('Light') || fontname[0].includes('light')) {
            weight = '300';
          } else if (fontname[0].includes('Thin') || fontname[0].includes('thin')) {
            weight = '100';
          }

          // Change font style
          if (fontname[0].includes('Italic') || fontname[0].includes('italic')) {
            style = 'italic';
          }

          /*
           * Write to style file scss mixin with font icnluded
           * Find this mixin in the styles folder in the _mixin.scss file
           * And exclude icons font
           */
          fontname = fontname[0];
          if (c_fontname != fontname && fontname != 'icons') {
            fs.appendFile( paths.src + '/scss/_fonts.scss', '@include font("' + name + '", "' + fontname + '", "' + weight + '", "' + style + '");\r\n', cb);
          }
          c_fontname = fontname;
        }
      }
    });
  });
};

// empty function
function cb() {}

// exports
const _fonts = gulp.parallel(
  woff,
  woff2,
  eot,
  ttfCopy
);

const fonts = gulp.series(
  _fonts,
  styles
);

module.exports = fonts;
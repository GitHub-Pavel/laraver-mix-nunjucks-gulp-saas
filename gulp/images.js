// Import external dependences
const {
  paths
} = require('../package.json');

// Import main dependences
const gulp = require('gulp');

// Import working dependecies
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');

// Minify and cache images
const images = () => {
  return gulp.src( paths.src + '/img/*' )
    .pipe(cache(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
    ])))
    .pipe(gulp.dest( paths.dist + '/img/' ));
};

module.exports = images;
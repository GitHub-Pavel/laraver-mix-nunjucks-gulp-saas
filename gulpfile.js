// Import external dependecies
const {
  paths
} = require('./package.json');

// Import main dependecies
const gulp = require('gulp');

// Import work dependecies
const watch = require('gulp-watch');
const fonts = require('./gulp/fonts');
/*
 * If you need svg icons sprite use module "sprite"
 * Next step you need include js module "svgLoader"
 * And exclude _icons.scss in main.scss file
 * Else if you need icons font use module "icons"
 */
const icons = require('./gulp/icons');
const images = require('./gulp/images');

// Watch all files: images, fonts, icons.
const _watch = () => {
  watch(
    paths.src + 'fonts/*.ttf',
    fonts
  );
  watch( 
    paths.src + '/icons/**/*.svg',
    icons
  );
  watch( 
    paths.src + '/img/**/*',
    images
  );
};

// exports
module.exports = {
  fonts,
  icons,
  images,
  build: gulp.parallel(
    fonts,
    icons,
    images
  )
};
module.exports.default = gulp.parallel(
  fonts,
  icons,
  images,
  _watch
);
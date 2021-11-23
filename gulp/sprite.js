// Import external dependecies
const {
  paths
} = require('../package.json');
const rimraf = require('rimraf');
const replace = require('gulp-replace');

// Import main dependecies
const gulp = require('gulp');

// Import working dependecies
const svgSprite = require('gulp-svg-sprite');
const cheerio = require('gulp-cheerio');
const cleanSvg = require('gulp-cheerio-clean-svg');

// Make icons sprite
const sprite = () => {
  return gulp.src(paths.src + '/icons/**/*.svg')
    .pipe(cheerio(cleanSvg({
      removeSketchType: true,
      removeEmptyGroup: true,
      removeEmptyDefs: true,
      removeEmptyLines: true,
      removeComments: true,
      tags: ["title", "desc"],
      attributes: ["id", "style", "fill*", "clip*", "stroke*", "mask", "opacity", "transform"]
    })))
    .pipe(replace("&gt;", ">"))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../sprite.svg'
        }
      },
      svg: {
        namespaceClassnames: false
      }
    }))
    .pipe(gulp.dest(paths.dist + '/img/'))
}

const clean_sprite = cb => {
  rimraf( paths.dist + '/img/sprite.svg', cb )
}

const _sprite = gulp.series(
  clean_sprite,
  sprite
)

module.exports = _sprite;
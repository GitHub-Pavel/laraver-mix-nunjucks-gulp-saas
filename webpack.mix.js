const mix = require('laravel-mix');
const del = require('del');
require('laravel-mix-nunjucks');

const path = require('path');
const {
  paths 
} = require('./package.json');

const urlArray = path.dirname(__filename).split(path.sep);
const parentDir = urlArray.pop(); // If you make a layout
// const parentDir = urlArray[urlArray.length-3]; // If you use wordpress

mix.js( 
  paths.src + '/js/main.js', 
  paths.dist + '/js' 
);

mix.sass(
  paths.src + '/scss/styles.scss',
  paths.dist + '/css',
  {},
  [
    require('css-mqpacker'),
    require('cssnano')({
      preset: [
        'default', 
        {
          discardCommnets: {
            removeAll: true
          }
        }
      ]
    })
  ]
).options({
  processCssUrls: false
});

mix.njk(paths.src+'/html/', paths.dist, {
  ext: '.html',
  marked: null,
  watch: true,
  envOptions: {
    watch: true,
    noCache: true
  }
}).then(() => {
  del(paths.dist+'/partials');
  del(paths.dist+'/layouts');
});

mix.browserSync({
  proxy: parentDir,
  files: [
    paths.dist + '/css/main.css',
    paths.dist + '/js/main.js',
    paths.dist + '/**/*.html'
  ]
});
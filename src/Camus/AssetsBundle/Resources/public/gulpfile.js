'use strict';

var gulp = require("gulp");
var sass = require("gulp-sass");
var webpack = require("webpack-stream");

var paths = [
  'js/main.js',
  'js/CamusGlobalComponents/**/*.jsx',
  'js/CamusGlobalComponents/*.jsx',
  'js/CamusSingleComponents/*.jsx',
  'js/CamusSingleComponents/**/*.jsx',
  'scss/main/main.scss',
  'scss/modules/*.scss',
  'scss/groups/**/*.scss'];

gulp.task('sass',function(){
  return gulp.src('./scss/main/main.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on("error",sass.logError))
    .pipe(gulp.dest('./scss/main/'))
});

gulp.task('sass-light', function () {
  return gulp.src('./scss/groups/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('scss/main/groups'))
});

gulp.task('podcast',function(){
  return gulp.src('./scss/podcast/podcast.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on("error",sass.logError))
    .pipe(gulp.dest('./scss/podcast/'))
});

gulp.task("webpack",function(){
  return gulp.src('js/main.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('js/bundle/'));
});

gulp.task("webpackprod",function(){
  return gulp.src('js/main.js')
    .pipe(webpack( require('./webpack.prod.js') ))
    .pipe(gulp.dest('js/bundle/'));
});

gulp.task('default', gulp.series('sass-light', 'sass', 'webpack'));
gulp.task('deploy', gulp.series('sass-light', 'sass', 'webpackprod'));

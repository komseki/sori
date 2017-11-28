const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

gulp.task('default', ()=>{
    return gulp
        .src('./src/sample.js')
        .pipe(webpackStream(webpackConfig))
        .pipe()
        .pipe(gulp.dest('./dist/'));
});

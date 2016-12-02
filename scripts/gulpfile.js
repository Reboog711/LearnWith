/**
 * Created by jhouser on 11/25/2016.
 */

// load gulp modules
var gulp = require('gulp');
// installed w/ npm install --save-dev gulp-uglify
var uglify = require('gulp-uglify');
// installed w/ npm install --save-dev gulp-concat
var concat = require('gulp-concat');
// installed w/ npm install --save-dev gulp-order
var order = require('gulp-order');
// installed via npm install --save-dev clean-css
var cleanCSS = require("gulp-clean-css");
// installed via npm install --save-dev gulp-rename
var rename = require("gulp-rename");
// installed via npm install --save-dev gulp-sourcemaps
var sourcemaps = require('gulp-sourcemaps');
// installed by npm install --save-dev gulp del
var del = require('del');
// npm install --save-dev run-sequence
var runSequence = require('run-sequence');
// npm install --save-dev gulp-if
var gulpIf = require('gulp-if');


var sourceRoot = '../chapter8/angularApp/';
// JavaScript include all files for the mock services but ignore the coldFusion or nodeJS services
var javaScriptSource = [sourceRoot + 'com/**/*.js',
    '!' + sourceRoot + 'com/dotComIt/learnWith/services/coldFusion/**/*.js',
    '!' + sourceRoot + 'com/dotComIt/learnWith/services/nodeJS/**/*.js'
];
// main app location
var mainAppPath = 'dotComIt/learnWith/app/LearnWith.js';
// the destination file for all the JavaScript code
var javaScriptDestinationFile = 'learnWith.min.js';

// final destination path for all files
var destinationPath = 'build';
var mapPath = 'maps';



gulp.task('buildJS', function() {
    gulp.src(javaScriptSource)
        .pipe(gulpIf(devMode,sourcemaps.init()))
        .pipe(order([mainAppPath]))
        .pipe(concat(javaScriptDestinationFile))
        .pipe(uglify({mangle:true}))
        .pipe(gulpIf(devMode,sourcemaps.write(mapPath)))
        .pipe(gulp.dest(destinationPath))
});

// CSS Source
var cssSource = [sourceRoot + 'com/**/*.css'];

// destination file for all the css
var cssDestinationFile = 'learnWith.min.css';

gulp.task('buildCSS', function () {
    gulp.src(cssSource)
        .pipe(gulpIf(devMode,sourcemaps.init()))
        .pipe(cleanCSS())
        .pipe(concat(cssDestinationFile))
        .pipe(gulpIf(devMode,sourcemaps.write(mapPath)))
        .pipe(gulp.dest(destinationPath))
});


// to copy the JavaScript libraries
// var javaScriptLibraries = [sourceRoot + 'js/**/*.*'];
var javaScriptLibraries = [sourceRoot + 'js/**/md5-min.js'];

var destinationPathForJSLibraries = destinationPath + '/js';

gulp.task('copyJSLibraries', function () {
    gulp.src(javaScriptLibraries)
        .pipe(gulp.dest(destinationPathForJSLibraries));
});

// used to copy over the external html templates
var htmlTemplateSource = [sourceRoot + '**/*.html','!' + sourceRoot + 'index*.html'];

gulp.task('copyHTMLTemplates', function () {
    gulp.src(htmlTemplateSource)
        .pipe(gulp.dest(destinationPath));
});

// index
var htmlIndexSource = [sourceRoot + '**/index_FinalBuild.html'];

gulp.task('copyIndexHTML', function () {
    gulp.src(htmlIndexSource)
        .pipe(rename("index.html"))
        .pipe(gulp.dest(destinationPath));
});


var deletePath = [destinationPath + '/**']

gulp.task('clean', function () {
    return del(deletePath);
});

gulp.task('build', ['copyHTMLTemplates', 'buildJS','copyIndexHTML','buildCSS','copyJSLibraries']);

// watching for changes on the fly
//gulp.task('buildWatch', ['copyHTMLTemplates', 'buildJS','copyIndexHTML','buildCSS','copyJSLibraries'], function(){
gulp.task('buildWatch', ['build'], function(){
    gulp.watch(htmlTemplateSource,['copyHTMLTemplates']).on('change', function(event){
        console.log('Event Type' + event.type);
        console.log('File Path' + event.path);
    })
    gulp.watch(javaScriptSource,['buildJS']).on('change', function(event){
        console.log('Event Type' + event.type);
        console.log('File Path' + event.path);
    })
    gulp.watch(htmlIndexSource,['copyIndexHTML']).on('change', function(event){
        console.log('Event Type' + event.type);
        console.log('File Path' + event.path);
    })
    gulp.watch(cssSource,['buildCSS']).on('change', function(event){
        console.log('Event Type' + event.type);
        console.log('File Path' + event.path);
    })
    gulp.watch(javaScriptLibraries,['copyJSLibraries']).on('change', function(event){
        console.log('Event Type' + event.type);
        console.log('File Path' + event.path);
    })

});

gulp.task('cleanBuild', function () {
    runSequence('clean', 'build');
});


var devMode = true;
gulp.task('buildProd', function(){
    devMode = false;
    runSequence('clean', 'build');
});



gulp.task('default', function() {
    console.log('do something');
});

// you can run this using npm install to install the modules [comes from the package.json]
// then run the build using gulp build

// load gulp modules
var gulp = require('gulp');
// installed w/ npm install --save-dev gulp-uglify
var uglify = require('gulp-uglify');
// installed w/ npm install --save-dev gulp-concat
var concat = require('gulp-concat');
// installed via npm install --save-dev gulp-rename
var rename = require("gulp-rename");
// installed via npm install --save-dev clean-css
var cleanCSS = require("gulp-clean-css");

// create vars

// directory to the app's location
var sourceRoot = '../chapter8/angularApp/';

// JavaScript include all files for the mock services but ignore the coldFusion or nodeJS services
var javaScriptSource = [sourceRoot + 'com/**/*.js',
                        '!' + sourceRoot + 'com/dotComIt/learnWith/services/coldFusion/**/*.js',
                        '!' + sourceRoot + 'com/dotComIt/learnWith/services/nodeJS/**/*.js'
                        ];
// the destination file for all the JavaScript code
var javaScriptDestinationFile = 'learnWith.min.js';

// to copy the JavaScript libraries
var javaScriptLibraries = [sourceRoot + 'js/**/*.*'];


// CSS Source
var cssSource = [sourceRoot + 'com/**/*.css'];

// destination file for all the css
var cssDestinationFile = 'learnWith.min.css';


// used to copy over the external html templates
var htmlTemplateSource = [sourceRoot + '**/*.html','!' + sourceRoot + 'index*.html'];

// index
var htmlIndexSource = [sourceRoot + '**/index_FinalBuild.html'];


// final destination path for all files
var destinationPath = 'build';

var destinationPathForJSLibraries = destinationPath + '/js';

// way to copy the HTML templates; borrowed from
// http://www.levihackwith.com/how-to-make-gulp-copy-a-directory-and-its-contents/
gulp.task('copyHTMLTemplates', function () {
    gulp.src(htmlTemplateSource)
        .pipe(gulp.dest(destinationPath));
});

gulp.task('copyJSLibraries', function () {
    gulp.src(javaScriptLibraries)
        .pipe(gulp.dest(destinationPathForJSLibraries));
});


gulp.task('copyIndexHTML', function () {
    gulp.src(htmlIndexSource)
        .pipe(rename("index.html"))
        .pipe(gulp.dest(destinationPath));
});


gulp.task('buildJS', function () {
    gulp.src(javaScriptSource)
    //        .pipe(order[()])
        .pipe(concat(javaScriptDestinationFile))
        .pipe(uglify({mangle:true}))
        .pipe(gulp.dest(destinationPath))
});

gulp.task('buildCSS', function () {
    gulp.src(cssSource)
        .pipe(cleanCSS())
        .pipe(concat(cssDestinationFile))
        .pipe(gulp.dest(destinationPath))
});

gulp.task('build', ['copyHTMLTemplates', 'buildJS','copyIndexHTML','buildCSS','copyJSLibraries']);


/**
 * Created by jhouser on 1/19/2017.
 * updated 3/25/2017 to move configuration variables to separate file
 */

// if you need to edit paths; it is best do so in the config.js file
var config = require("./config").config;


// installed w/ npm install --save-dev gulp
var gulp = require("gulp");

// installed w/ npm install --save-dev gulp-tslint
var tslint = require('gulp-tslint');

// installed w/ npm install --save-dev gulp-typescript
var tsc = require("gulp-typescript");
var tsProject = tsc.createProject("tsconfig.json");

// installed w/ npm install --save-dev gulp-sourcemaps
var sourcemaps = require('gulp-sourcemaps');

// installed by npm install --save-dev del
var del = require('del');

// npm install --save-dev gulp-if
var gulpIf = require('gulp-if');

// installed w/ npm install --save-dev gulp-uglify
var uglify = require('gulp-uglify');

// npm install --save-dev run-sequence
var runSequence = require('run-sequence');


// installed for CSS processing
// installed via npm install --save-dev gulp-clean-css
var cleanCSS = require("gulp-clean-css");
// installed for CSS processing
// installed w/ npm install --save-dev gulp-concat
var concat = require('gulp-concat');

// installed for running unit tests
var karma = require("karma");

// Lint all custom TypeScript files.
gulp.task('tslint', function() {
    return gulp.src(config.typeScriptSource)
        .pipe(tslint({
            formatter: 'prose',
            // added for this bug https://github.com/panuhorsmalahti/gulp-tslint/issues/136
            program: require("tslint").Linter.createProgram("./tsconfig.json")
        }))
        .pipe(tslint.report());
});


// the basic task for compiling TypeScript; will run lint on the files first.
// will minimize code w/ uglify and optionally create source maps
gulp.task("buildTS", ["tslint"], function() {
    var tsResult = gulp.src(config.typeScriptSource)
        .pipe(gulpIf(config.devMode,sourcemaps.init()))
        .pipe(tsProject());
    return tsResult.js
        // only uglify if not generating source maps
        // because of a bug that screwed up source maps for TypeScript files if uglify is used
        // https://stackoverflow.com/questions/38366001/typescript-sourcemaps-wrong-after-gulp-uglify
        .pipe(gulpIf(!config.devMode,uglify()))
        .pipe(gulpIf(config.devMode,sourcemaps.write(config.mapPath)))
        .pipe(gulp.dest(config.destinationPath));
});

gulp.task('processCSS', function () {
    gulp.src(config.cssSource, { base: '.' })
        .pipe(gulpIf(config.devMode,sourcemaps.init()))
        .pipe(cleanCSS({
            rebase : false
        }))
        .pipe(concat(config.cssDestinationFile))
        .pipe(gulpIf(config.devMode,sourcemaps.write(config.mapPath)))
        .pipe(gulp.dest(config.destinationPath))
});

gulp.task('copyAngularCSS', function () {
    gulp.src(config.cssStyleURLsSource)
        .pipe(gulpIf(config.devMode,sourcemaps.init()))
        .pipe(cleanCSS({
            rebase : false
        }))
        .pipe(gulpIf(config.devMode,sourcemaps.write(config.destinationPathForCSSStyleURLMaps)))
        .pipe(gulp.dest(config.destinationPathForCSSStyleURLs))
});

// Build the project.
gulp.task("buildCSS", ['copyAngularCSS', 'processCSS']);



// copy JS libraries custom to the project
gulp.task('copyJSLibraries', function () {
    gulp.src(config.javaScriptLibraries)
        .pipe(gulp.dest(config.destinationPathForJSLibraries));
});

// task to copy all the angular libraries
// and other dependencies instlled by Node
gulp.task('copyAngularLibraries', function () {
    // copy JS libraries custom to the project
    gulp.src(config.angularLibraries, {cwd: config.nodeModulesSource})
        .pipe(gulp.dest(config.destinationPathForJSLibraries));
});

// a task to copy HTML files from src to the build folder
gulp.task('copyHTML', function () {
    return gulp.src(config.htmlSource)
        .pipe(gulp.dest(config.destinationPath));
});

gulp.task('copyStaticAssets', function () {
    return gulp.src(config.staticAssetsSource)
        .pipe(gulp.dest(config.destinationPathForStaticAssets));
});
// a task to delete the build directory and everything in it
gulp.task('clean', function () {
    return del(config.deletePath);
});

// Build the project.
gulp.task("build", ['buildTS', 'copyJSLibraries', 'copyAngularLibraries','copyHTML','buildCSS','copyStaticAssets']);

// delete everything then build the project
gulp.task('cleanBuild', function () {
    runSequence('clean', 'build');
});

// build a production build
// deletes the build directory w/ clean; then sets the devMode to false; and runs the build task
// devMode to true means no source maps.
gulp.task('buildProd', function(){
    config.devMode = false;
    gulp.start('cleanBuild')
});

// watching for changes on the fly
gulp.task('buildWatch', ['build'], function(){
    gulp.watch(config.typeScriptSource,['buildTS']).on('change', function(event){
        console.log('File Path' + event.path);
    });
    gulp.watch(config.htmlSource,['copyHTML']).on('change', function(event){
        console.log('File Path' + event.path);
    });
    gulp.watch(config.javaScriptLibraries,['copyJSLibraries']).on('change', function(event){
        console.log('File Path' + event.path);
    });

    gulp.watch(config.cssSource,['processCSS']).on('change', function(event){
        console.log('File Path' + event.path);
    });

    gulp.watch(config.cssStyleURLsSource,['copyAngularCSS']).on('change', function(event){
        console.log('File Path' + event.path);
    });

});

gulp.task("test", function () {
    new karma.Server({
        configFile: __dirname + "/karma.conf.js",
        files : config.testFilePatterns,
        proxies: {
            "/com/" : "/" + config.testWebRoot + config.sourceRoot + config.codeRoot,
        },
        exclude : config.defaultDirsToExclude,
    }).start();
});
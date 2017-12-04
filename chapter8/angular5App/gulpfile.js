var config = require("./config").config;

var gulp = require("gulp");
var tslint = require('gulp-tslint');

var sourcemaps = require('gulp-sourcemaps');

var uglify = require('gulp-uglify');

var gulpIf = require('gulp-if');

gulp.task('tslint', function() {
    return gulp.src(config.typeScriptSource)
                .pipe(tslint({
                    formatter: 'prose',
                    program: require("tslint").Linter.createProgram("./tsconfig.json")
                }))
                .pipe(tslint.report());
});

var tsc = require("gulp-typescript");
var tsProject = tsc.createProject("tsconfig.json");

gulp.task("buildTS", ["tslint"], function() {
    var tsResult = gulp.src(config.typeScriptSource)
        .pipe(gulpIf(config.devMode,sourcemaps.init()))
        .pipe(tsProject());
    return tsResult.js
                    .pipe(gulpIf(!config.devMode,uglify()))
                    .pipe(gulpIf(config.devMode,sourcemaps.write(config.mapPath)))
                    .pipe(gulp.dest(config.destinationPath));

});


gulp.task('copyAngularLibraries', function () {
    gulp.src(config.angularLibraries, {cwd: config.nodeModulesSource})
        .pipe(gulp.dest(config.destinationPathForJSLibraries));
});

gulp.task('copyJSLibraries', function () {
    gulp.src(config.javaScriptLibraries)
        .pipe(gulp.dest(config.destinationPathForJSLibraries));
});


gulp.task('copyHTML', function () {
    return gulp.src(config.htmlSource)
        .pipe(gulp.dest(config.destinationPath));
});


var cleanCSS = require("gulp-clean-css");
var concat = require('gulp-concat');

gulp.task('processCSS', function () {
    gulp.src(config.cssSource, { base: '.' })
        .pipe(gulpIf(config.devMode,sourcemaps.init()))
        .pipe(cleanCSS())
        .pipe(concat(config.cssDestinationFile))
        .pipe(gulpIf(config.devMode,sourcemaps.write(config.mapPath)))
        .pipe(gulp.dest(config.destinationPath))
});


gulp.task('copyAngularCSS', function () {
    gulp.src(config.cssStyleURLsSource)
        .pipe(gulpIf(config.devMode,sourcemaps.init()))
        .pipe(cleanCSS())
        .pipe(gulpIf(config.devMode,sourcemaps.write(config.destinationPathForCSSStyleURLMaps)))
        .pipe(gulp.dest(config.destinationPathForCSSStyleURLs))
});

gulp.task("buildCSS", ['copyAngularCSS', 'processCSS']);

gulp.task('copyStaticAssets', function () {
    return gulp.src(config.staticAssetsSource)
        .pipe(gulp.dest(config.destinationPathForStaticAssets));
});

gulp.task('copyGridAssets', function () {
    return gulp.src('node_modules/@swimlane/ngx-datatable/release/assets/fonts/*.*')
        .pipe(gulp.dest(config.destinationPath + '/fonts'));
});

gulp.task("build", ['buildTS', 'copyJSLibraries', 'copyAngularLibraries','copyHTML','buildCSS','copyStaticAssets','copyGridAssets']);

var del = require('del');

gulp.task('clean', function () {
    return del(config.deletePath);
});

var runSequence = require('run-sequence');

gulp.task('cleanBuild', function () {
    runSequence('clean', 'build');
});

gulp.task('buildProd', function(){
    config.devMode = false;
    gulp.start('cleanBuild')
});

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


var karma = require('karma');
gulp.task('test', function () {
    new karma.Server({
        configFile: __dirname + "/karma.conf.js",
        files : config.testFilePatterns,
        proxies: {
            "/com/" : "/" + config.testWebRoot + config.sourceRoot + config.codeRoot,
            "img/" : "/" + config.testWebRoot + config.sourceRoot + "img"
        },
        exclude : config.defaultDirsToExclude
/*
        exclude : [
            'src/com/dotComIt/learnWith/main/main.*ts',
            'src/com/dotComIt/learnWith/main/app.module.coldfusion.ts',
            'src/com/dotComIt/learnWith/services/coldfusion/!**!/!*.ts',
            'tests/com/dotComIt/learnWith/services/coldfusion/!**!/!*.ts',
            'src/com/dotComIt/learnWith/main/app.module.nodejs.ts',
            'src/com/dotComIt/learnWith/services/nodeJS/!**!/!*.ts',
            'tests/com/dotComIt/learnWith/services/nodeJS/!**!/!*.ts'
        ]
*/
    }).start();
});

gulp.task("testColdFusion", function () {
    new karma.Server({
        configFile: __dirname + "/karma.conf.js",
        files : config.testFilePatterns,
        proxies: {
            "/com/" : "/" + config.testWebRoot + config.sourceRoot +
            config.codeRoot
        },
        exclude : config.CFDirsToExclude,
    }).start();
});

gulp.task("testNodeJS", function () {
    new karma.Server({
        configFile: __dirname + "/karma.conf.js",
        files : config.testFilePatterns,
        proxies: {
            "/com/" : "/" + config.testWebRoot + config.sourceRoot + config.codeRoot
        },
        exclude : config.NodeJSDirsToExclude,
    }).start();
});


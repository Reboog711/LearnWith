/**
 * Created by jhouser on 3/25/2017.
 */

var baseDirs = {
    // the root for all source code
    sourceRoot : "src/",

    // the code root; we assume all your custom angular components will go here or in some subdirectory of it
    codeRoot : 'com',

    // the output path for the processed code
    destinationPath : 'build',

    // The path for the source map files in build directory; they are kept external by default
    mapPath : 'maps',

    // The root directory for all the tests
    testRoot : "tests/",

    // The root directory for all the tests
    testWebRoot : "base/"


};

var configObject = {
    // A variable that points to the TypeScript source location
    // will find all TypeScript files in the sourceRoot directory, recursively
    typeScriptSource : [baseDirs.sourceRoot + "**/*.ts"],

    // a variable that points to the typeScript test source location
    // finds all the TypeScript files in the sourceRoot, recusrively
    typeScriptTestSource : [baseDirs.testRoot + "**/*.ts"],


    //a variable that points to the HTML Source
    // will find all HTML Source files in the source root directory, recursively
    htmlSource : [baseDirs.sourceRoot + '**/*.html'],

    // a variable that points to the HTML template files used by Angular components
    // we assume all these will be under the com directory
    // just used for unit testing since the above htmlSource variable will be used for most build scripts
    htmlTemplateSource : [baseDirs.sourceRoot + baseDirs.codeRoot + '/**/*.html'],

    // The location of all JavaScript libraries stored in the source path
    // by default this just contains the systemJS Config used by Angular
    // will find all js files in the sourceRoot directory, recursively
    javaScriptLibraries : [baseDirs.sourceRoot + 'js/**/*.js'],

    // the final destination of the JavaScript libraries
    // The directory structure of the javaScriptLibraries directory will be retained when moving files from source to destination
    // if you change this value; the serc/systemJSConfig/systemjs.config.js may also need updating
    destinationPathForJSLibraries : baseDirs.destinationPath + '/js',

    // a GLOB to find all the CSS Source
    // this purposely ignores CSS in the com directory because we assume anything in there
    // is Angular 2 component specific and will be referenced using the styleUrls property
    // so that file can't go away and be combined
    cssSource : [baseDirs.sourceRoot + '**/*.css',
                '!' + baseDirs.sourceRoot + baseDirs.codeRoot + '/**/*.css',
                'node_modules/@swimlane/ngx-datatable/release/**/*.css',
                '!node_modules/@swimlane/ngx-datatable/release/**/app.css'],

    // The destination file for all the merged css
    cssDestinationFile : 'app.min.css',

    // a GLOB pointing to the CSS files inside the com directory, which presumably
    // will be loaded via Angular 2 Component styleUrls properties
    // these files will be minimized and copied, but not moved.
    cssStyleURLsSource : [baseDirs.sourceRoot + baseDirs.codeRoot + '/**/*.css'],

    // final resting place for the Angular styleURLs CSS that are copied from source to destination
    // subdirectory structure is retained
    destinationPathForCSSStyleURLs : baseDirs.destinationPath + '/' + baseDirs.codeRoot,

    // the destination path for CSS Style URL Maps
    // this puts them in the same map path, but because of assumed different directory structures; can't just use the mappath value
    destinationPathForCSSStyleURLMaps : '../'  + baseDirs.mapPath + '/' + baseDirs.codeRoot,

    // static assets path; most likely images in the source directory
    staticAssetsSource : [baseDirs.sourceRoot + 'img/*.*'],

    // destination path for copying static assets
    destinationPathForStaticAssets : baseDirs.destinationPath + '/img'

};

var testingDirsToIgnoreObject = {
    mainApp : baseDirs.sourceRoot + baseDirs.codeRoot + '/dotComIt/learnWith/main/main*.ts',

    defaultModule : baseDirs.sourceRoot + baseDirs.codeRoot + '/dotComIt/learnWith/main/app.module.*.ts',
    defaultServicesSource : baseDirs.sourceRoot + baseDirs.codeRoot + '/dotComIt/learnWith/services/mock/**/*.ts',
    defaultTestSource : baseDirs.testRoot + baseDirs.codeRoot + '/dotComIt/learnWith/services/mock/**/*.ts',

    CFModule : baseDirs.sourceRoot + baseDirs.codeRoot + '/dotComIt/learnWith/main/app.module.coldfusion.ts',
    CFServicesSource : baseDirs.sourceRoot + baseDirs.codeRoot + '/dotComIt/learnWith/services/coldfusion/**/*.ts',
    CFTestSource : baseDirs.testRoot + baseDirs.codeRoot + '/dotComIt/learnWith/services/coldfusion/**/*.ts',

    NodeJSModule : baseDirs.sourceRoot + baseDirs.codeRoot + '/dotComIt/learnWith/main/app.module.nodejs.ts',
    NodeJSServicesSource : baseDirs.sourceRoot + baseDirs.codeRoot + '/dotComIt/learnWith/services/nodeJS/**/*.ts',
    NodeJSTestSource : baseDirs.testRoot + baseDirs.codeRoot + '/dotComIt/learnWith/services/nodeJS/**/*.ts',

};

// these are values you probably won't want to change, but can
var staticConfig = {
    // points to node_modules install
    // used in conjunction with angularLibraries value to copy Angular libraries from node_modules to build directory
    nodeModulesSource : "node_modules/**",

    // an array of Globs that point to the Angular libraries
    // these are copied from the node_Modules install location to the destinationPathForJSLibraries
    angularLibraries : [
        'core-js/client/shim.min.js',
        'zone.js/dist/**',
        'reflect-metadata/Reflect.js',
        'systemjs/dist/system.src.js',
        '@angular/**/bundles/**',
        'rxjs/**/*.js',
        'angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
        'ts-md5/dist/**.js',
        '@swimlane/ngx-datatable/release/index.js',
        '@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js'
    ],

    // a glob used to delete all files in the destination path before
    // before cleaning up
    deletePath : [baseDirs.destinationPath + '/**'],


    // variable to determine if source maps are used or not
    // by default true; but if we create a production build they are not generated
    devMode : true,

    // the patterns for all the test files
    testFilePatterns : [
        { pattern: baseDirs.testRoot + "base.test.ts" }, // new file not created yet
        { pattern: configObject.typeScriptSource[0] }, // existed
        { pattern: configObject.htmlTemplateSource[0] }, // new
        { pattern: configObject.cssStyleURLsSource[0] }, // existed
        { pattern: configObject.typeScriptTestSource[0] } // new
    ],


    defaultDirsToExclude : [
        testingDirsToIgnoreObject.mainApp,
        testingDirsToIgnoreObject.CFModule, testingDirsToIgnoreObject.CFServicesSource, testingDirsToIgnoreObject.CFTestSource,
        testingDirsToIgnoreObject.NodeJSModule, testingDirsToIgnoreObject.NodeJSServicesSource, testingDirsToIgnoreObject.NodeJSTestSource
    ],

    CFDirsToExclude : [
        testingDirsToIgnoreObject.mainApp,
        testingDirsToIgnoreObject.defaultModule, /* testingDirsToIgnoreObject.defaultServicesSource, */ testingDirsToIgnoreObject.defaultTestSource,
        testingDirsToIgnoreObject.NodeJSModule, testingDirsToIgnoreObject.NodeJSServicesSource, testingDirsToIgnoreObject.NodeJSTestSource
    ],
    NodeJSDirsToExclude : [
        testingDirsToIgnoreObject.mainApp,
        testingDirsToIgnoreObject.defaultModule, /* testingDirsToIgnoreObject.defaultServicesSource, */ testingDirsToIgnoreObject.defaultTestSource,
        testingDirsToIgnoreObject.CFModule, testingDirsToIgnoreObject.CFServicesSource, testingDirsToIgnoreObject.CFTestSource,
    ],

};

exports.config = Object.assign(baseDirs,configObject,staticConfig);
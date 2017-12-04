var baseDirs = {
    sourceRoot : "src/",
    codeRoot : 'com',
    destinationPath : 'build',
    mapPath : 'maps',
    testRoot : "tests/",
    testWebRoot : "base/"
};

var configObject = {
    typeScriptSource : [baseDirs.sourceRoot + "**/*.ts"],

    typeScriptTestSource : [baseDirs.testRoot + "**/*.ts"],

    destinationPathForJSLibraries : baseDirs.destinationPath + '/js',

    htmlSource : [baseDirs.sourceRoot + '**/*.html'],

    htmlTemplateSource : [baseDirs.sourceRoot + baseDirs.codeRoot + '/**/*.html'],

    javaScriptLibraries : [baseDirs.sourceRoot + 'js/**/*.js'],

    destinationPathForJSLibraries : baseDirs.destinationPath + '/js',

    cssSource : [baseDirs.sourceRoot + '**/*.css',
        '!' + baseDirs.sourceRoot + baseDirs.codeRoot + '/**/*.css',
        'node_modules/@swimlane/ngx-datatable/release/**/*.css',
        '!node_modules/@swimlane/ngx-datatable/release/**/app.css'
    ],


    cssDestinationFile : 'app.min.css',

    cssStyleURLsSource : [baseDirs.sourceRoot + baseDirs.codeRoot + '/**/*.css'],

    destinationPathForCSSStyleURLs : baseDirs.destinationPath + '/' + baseDirs.codeRoot,

    destinationPathForCSSStyleURLMaps : '../'  + baseDirs.mapPath + '/' + baseDirs.codeRoot,

    staticAssetsSource : [baseDirs.sourceRoot + 'img/*.*'],

    destinationPathForStaticAssets : baseDirs.destinationPath + '/img'

};

var testingDirsToIgnoreObject = {
    mainApp : baseDirs.sourceRoot + baseDirs.codeRoot + '/dotComIt/learnWith/main/main*.ts',
    defaultModule : baseDirs.sourceRoot + baseDirs.codeRoot + '/dotComIt/learnWith/main/app.module.ts',
    defaultServicesSource : baseDirs.sourceRoot + baseDirs.codeRoot + '/dotComIt/learnWith/services/mock/**/*.ts',
    defaultTestSource : baseDirs.testRoot + baseDirs.codeRoot + '/dotComIt/learnWith/services/mock/**/*.ts',

    CFModule : baseDirs.sourceRoot + baseDirs.codeRoot + '/dotComIt/learnWith/main/app.module.coldfusion.ts',
    CFTestSource : baseDirs.testRoot + baseDirs.codeRoot + '/dotComIt/learnWith/services/coldFusion/**/*.ts',
    CFServicesSource : baseDirs.sourceRoot + baseDirs.codeRoot + '/dotComIt/learnWith/services/coldFusion/**/*.ts',

    NodeJSModule : baseDirs.sourceRoot + baseDirs.codeRoot + '/dotComIt/learnWith/main/app.module.nodejs.ts',
    NodeJSServicesSource : baseDirs.sourceRoot + baseDirs.codeRoot + '/dotComIt/learnWith/services/nodeJS/**/*.ts',
    NodeJSTestSource : baseDirs.testRoot + baseDirs.codeRoot + '/dotComIt/learnWith/services/nodeJS/**/*.ts',


}

var staticConfig = {

    nodeModulesSource : "node_modules/**",

    angularLibraries : [
        'core-js/client/shim.min.js',
        'zone.js/dist/**',
        'systemjs/dist/system.src.js',
        '@angular/**/bundles/**',
        'rxjs/**/*.js',
        'ts-md5/dist/**.js',
        'tslib/**.js',
        '@swimlane/ngx-datatable/release/index.js',
        '@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js'
    ],

    deletePath : [baseDirs.destinationPath + '/**'],

    devMode : true,

    testFilePatterns : [
        { pattern: baseDirs.testRoot + "base.test.ts" },  // new file
        { pattern: configObject.typeScriptSource[0] },    // existed
        { pattern: configObject.htmlTemplateSource[0] },  // new
        { pattern: configObject.cssStyleURLsSource[0] },  // existed
        { pattern: configObject.typeScriptTestSource[0] } // new
    ],

    defaultDirsToExclude : [
        testingDirsToIgnoreObject.mainApp,
        testingDirsToIgnoreObject.CFModule,
        testingDirsToIgnoreObject.CFServicesSource,
        testingDirsToIgnoreObject.CFTestSource,
        testingDirsToIgnoreObject.NodeJSModule,
        testingDirsToIgnoreObject.NodeJSServicesSource,
        testingDirsToIgnoreObject.NodeJSTestSource
    ],
    CFDirsToExclude : [
        testingDirsToIgnoreObject.mainApp,
        testingDirsToIgnoreObject.defaultModule,
        testingDirsToIgnoreObject.defaultTestSource,
        testingDirsToIgnoreObject.NodeJSModule,
        testingDirsToIgnoreObject.NodeJSServicesSource,
        testingDirsToIgnoreObject.NodeJSTestSource
    ],
    NodeJSDirsToExclude : [
        testingDirsToIgnoreObject.mainApp,
        testingDirsToIgnoreObject.defaultModule,
        testingDirsToIgnoreObject.defaultTestSource,
        testingDirsToIgnoreObject.CFModule,
        testingDirsToIgnoreObject.CFServicesSource,
        testingDirsToIgnoreObject.CFTestSource,
    ],


};



exports.config = Object.assign(baseDirs,configObject,staticConfig);
var libraries = [
    'node_modules/angular/angular.js',
    'node_modules/angular-route/angular-route.js',
    'node_modules/angular-mocks/angular-mocks.js',
    'node_modules/angular-ui-grid/ui-grid.js',
    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
];

var sourceRoot = '../chapter8/angularApp/';

// force so the main module is defined before the rest of the angular code
var javaScriptSource = [sourceRoot + 'com/dotComIt/learnWith/app/LearnWith.js', sourceRoot + 'com/**/*.js'];

var externalLibraries = [sourceRoot + 'js/**/*.js'];

var testRoot = '../chapter8/tests/angularApp/';
var testSource = [testRoot + 'com/**/*.js'];

var allSource = libraries.concat(externalLibraries).concat(javaScriptSource).concat(testSource);

module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        client : {
            captureConsole : false
        },
        files : allSource,
        frameworks: ['jasmine'],
        reporters : ['dots'],
        singleRun : true

    });
};
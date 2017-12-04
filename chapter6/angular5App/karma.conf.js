module.exports = function(config) {
    config.set({
        browsers: ["Chrome"],
        client : {
            captureConsole : false
        },
        frameworks: ["jasmine", "karma-typescript"],
        karmaTypescriptConfig: {
            tsconfig: "./tsconfig.test.json", // this will get rid of all compiler error messages
        },
        // because it thinks that the ts files are video files and won't load them
        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },
        preprocessors: {
            "**/*.ts": ["karma-typescript"],
        },
        reporters: ["progress", "kjhtml"] // , "dots" "karma-typescript",
    });
};
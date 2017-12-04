(function (global) {
    System.config({
        paths: {
            'js:': 'js/'
        },
        map: {
            app: 'com',
            '@angular/core': 'js:@angular/core/bundles/core.umd.js',
            '@angular/common': 'js:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'js:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'js:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'js:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/common/http': 'js:@angular/common/bundles/common-http.umd.js',
            '@angular/router': 'js:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'js:@angular/forms/bundles/forms.umd.js',
            'rxjs':  'js:rxjs',
            'ts-md5' : 'js:ts-md5 ',
            'tslib': 'js:tslib',
            '@swimlane/ngx-datatable' : 'js:@swimlane/ngx-datatable/release/index.js',
            '@ng-bootstrap/ng-bootstrap': 'js:@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js'
        },
        packages: {
            app: {
                main: './dotComIt/learnWith/main/main.coldfusion.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'ts-md5': {
                main: '/md5.js'
            },
            'tslib': {
                main: '/tslib.js'
            }


        }



    });
})(this);

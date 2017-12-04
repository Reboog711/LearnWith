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
//            '@angular/http': 'js:@angular/http/bundles/http.umd.js',
            '@angular/router': 'js:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'js:@angular/forms/bundles/forms.umd.js',
            'rxjs':  'js:rxjs',
            '@swimlane/ngx-datatable' : 'js:@swimlane/ngx-datatable/release/index.js',
            '@ng-bootstrap/ng-bootstrap': 'js:@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js'
        },
        packages: {
            app: {
                main: './dotComIt/learnWith/main/main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            }
        }



    });
})(this);

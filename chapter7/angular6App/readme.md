# DotComIt Seed Project: Angular 6 w/ TypeScript

This is a the base build script [DotComIt](http://www.dot-com-it.com) uses for creating Angular 4 projects.
This was loosely based on [another Angular2, TypeScript, Gulp project](https://github.com/kolorobot/angular2-typescript-gulp)


## Install and Setup

To install the node dependencies run this from the main directory:

```
npm install
```

This will install all the required dependencies via NodeJS.

Then, open up the config.js file where you can tweak directories and other config settings. 
The scripts are located in gulpfile.js.


## Directory Structure

* **ProjectRoot**: Main project root; your build script files go here
    * **build**: This contains your project build; for when you run the Gulp Task
        * **maps**: Source maps are placed here if generated.
    * **node_modules**: The installed modules for NodeJS. This will be created when you run npm install, and for all intents and purposes you can ignore.
    * **src**: Your App's code goes here
        * **com**: Custom TypeScript files go here.
        * **js**: Local JavaScript libraries go here. A systemJS configuration file is included.
    * **tests**: Your App's tests go here


## Gulp Task List

* **tslint**: A task used to verify the type script files.  Called automatically before buildTS is run. 
* **buildTS**: A task used to compile TypeScript files in the source.  It minimizes them with Uglify.  By default source maps are created.
* **processCSS**: A task used to process CSS. It minimizes them with Clean-CSS and concatenates it to a single CSS file. CSS Files in the com directory are ignored under the assumption they are referenced by Angular 2 components directly using the styleUrls property. By default source maps are created.
* **copyAngularCSS**: A task used to process CSS files used by Angular 2.  It minimizes them with Clean-CSS, and copies the files to the com directory. It is assumed files in the com directory are referenced by Angular 2 components with the styleUrls property, and cannot be combined to a single file. By default source maps are created.
* **buildCSS**: A task used to process all CS. It runs processCSS and copyAngularCSS.
* **copyJSLibraries**: A task to copy all JavaScript files from the src/js directory to the build/js directory.
* **copyAngularLibraries**: A task to copy all Angular JS library files from node_modules directory to the build/js directory.
* **copyHTML**: A task to copy all HTML in the src directory to the build directory. These files are left unchanged.
* **copyStaticAssets**: A task to copy all static assets from the src directory to the build directory.  Most likely this will be images or font files that require no processing.  These files are left unchanged.
* **clean**: A task to delete the build directory.
* **build**: A task to create a build. It runs buildTS, copyJSLibraries, copyAngularLibraries, and copyHTML.
* **cleanBuild**: A task to delete the build directory first, and then run a build.
* **buildProd**: A task to build a production build.  First this runs the clean task; then it runs the build process.  If you run this task source maps will not be created.
* **buildWatch**: A task to watch the build directories for changed HTML, TypeScript, or JavaScript files and re-build the app on the fly.
* **test**: A task to run your tests.

## Todo List

* Figure out a way to Enable Prod mode for Angular when running the buildProd
* Write instructions for adding new libraries, such as ng-bootstrap and/or ngx-datatable. They requires systemjs.config modifications and additions to config.js--copyGridAssets
* Remove Angular / other library map files when creating builds

## Known Issues

* The buildWatch task will not process HTML files that were created after the buildWatch task starts.

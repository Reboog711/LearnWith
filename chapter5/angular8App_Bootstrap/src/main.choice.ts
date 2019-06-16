import {environment} from "./environments/environment";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {AppModuleColdFusion} from "./app/app.module.coldfusion";
import {AppModule} from "./app/app.module";
import {AppModuleJava} from "./app/app.module.java";
import {AppModuleNodeJS} from "./app/app.module.nodejs";
import {AppModulePHP} from "./app/app.module.php";

export class AppChoice {

  // load different versions of the app with
  // ng serve --configuration={insertconfighere}
  public static determineAppToLoad() {
    // ng serve --configuration=coldfusion
    console.log(environment)

    if (environment.coldFusion) {
      console.log('found CF');
      platformBrowserDynamic().bootstrapModule(AppModuleColdFusion)
        .catch(err => console.log(err));
    // ng serve --configuration=java
    } else if (environment.java) {
      console.log('found Java');
      platformBrowserDynamic().bootstrapModule(AppModuleJava)
        .catch(err => console.log(err));
    // ng serve --configuration=nodejs
    } else if (environment.nodeJS) {
      console.log('found NodeJS');
      platformBrowserDynamic().bootstrapModule(AppModuleNodeJS)
        .catch(err => console.log(err));
    // ng serve --configuration=php
    } else if (environment.php) {
      console.log('found PHP');
      platformBrowserDynamic().bootstrapModule(AppModulePHP)
        .catch(err => console.log(err));
    } else {
      // ng serve
      console.log('Loading Mock Service Version');
      platformBrowserDynamic().bootstrapModule(AppModule)
        .catch(err => console.log(err));
    }
  }
}

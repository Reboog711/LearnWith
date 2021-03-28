import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {AppChoice} from "./main.choice";

if (environment.production) {
  enableProdMode();
}

// this is some magic not written about in the books to determine which version of the app we are loading
// hacky way to let the app load different versions of itself; we can't remove this code in here
let hack = false;
if(hack){
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
}

// real loading is off-loaded
AppChoice.determineAppToLoad();

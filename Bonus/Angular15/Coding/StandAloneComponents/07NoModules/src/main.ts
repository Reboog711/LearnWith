import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from "./app/app.component";
import {provideRouter, Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: `view1`,
    loadComponent: () => import(`./app/wrapper/wrapper.component`).then(
      m => m.WrapperComponent
    )
  },
  {
    path: `view2`,
    loadComponent: () => import(`./app/view2/view2.component`).then(
      m => m.View2Component
    )
  },
  { path: '**', redirectTo: 'view1' }
];


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
  ]
});
/*
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
*/

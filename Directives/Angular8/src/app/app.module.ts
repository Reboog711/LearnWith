import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UseAttributeDirectiveComponent } from './use-attribute-directive/use-attribute-directive.component';
import { CreateAttributeDirectiveComponent } from './create-attribute-directive/create-attribute-directive.component';
import { UseStructuralDirectiveComponent } from './use-structural-directive/use-structural-directive.component';
import { CreateStructuralDirectiveComponent } from './create-structural-directive/create-structural-directive.component';
import { ReverseDirective } from './directives/reverse.directive';
import { Reverse01Directive } from './directives/reverse01.directive';
import { Reverse02Directive } from './directives/reverse02.directive';
import { Reverse03Directive } from './directives/reverse03.directive';
import { HasAccessDirective } from './directives/has-access.directive';

@NgModule({
  declarations: [
    AppComponent,
    UseAttributeDirectiveComponent,
    CreateAttributeDirectiveComponent,
    UseStructuralDirectiveComponent,
    CreateStructuralDirectiveComponent,
    ReverseDirective,
    Reverse01Directive,
    Reverse02Directive,
    Reverse03Directive,
    HasAccessDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

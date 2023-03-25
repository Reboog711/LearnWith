import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UseAttributeDirectiveComponent} from './use-attribute-directive/use-attribute-directive.component';
import {CreateAttributeDirectiveComponent} from './create-attribute-directive/create-attribute-directive.component';
import {UseStructuralDirectiveComponent} from './use-structural-directive/use-structural-directive.component';
import {CreateStructuralDirectiveComponent} from './create-structural-directive/create-structural-directive.component';

const routes: Routes = [
  {path: 'sample1', component: UseAttributeDirectiveComponent},
  {path: 'sample2', component: CreateAttributeDirectiveComponent},
  {path: 'sample3', component: UseStructuralDirectiveComponent},
  {path: 'sample4', component: CreateStructuralDirectiveComponent},
  { path: '**', redirectTo: '/sample1'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

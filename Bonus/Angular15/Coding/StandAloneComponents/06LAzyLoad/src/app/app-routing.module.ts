import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { View2Component } from './view2/view2.component';
import { WrapperComponent } from './wrapper/wrapper.component';

const routes: Routes = [
/*
  {
    path: 'view1', component: WrapperComponent
  },
  {
    path: 'view2', component: View2Component
  },
*/
  {
    path: `view1`,
    loadComponent: () => import(`./wrapper/wrapper.component`).then(
      m => m.WrapperComponent
    )
  },
  {
    path: `view2`,
    loadComponent: () => import(`./view2/view2.component`).then(
      m => m.View2Component
    )
  },
  { path: '**', redirectTo: 'view1' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import {AppComponent} from "../app.component";
import {LoginComponent} from "../views/login/login.component";
import {TasksComponent} from "../views/tasks/tasks.component";
import {TaskGridComponent} from "../views/task-grid/task-grid.component";
import {TaskFilterComponent} from "../views/task-filter/task-filter.component";
import {TaskCuComponent} from "../views/task-cu/task-cu.component";
import {TaskSchedulerComponent} from "../views/task-scheduler/task-scheduler.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";
import {FormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthenticationService} from "../services/mock/authentication.service";
import {TaskService} from "../services/mock/task.service";
import {Router} from "@angular/router";
import {UserModel} from "../model/user-model";

describe('AuthGuard', () => {
  let router: Router;
  let userModel: UserModel;
  let guard: AuthGuard;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LoginComponent,
        TasksComponent,
        TaskGridComponent,
        TaskFilterComponent,
        TaskCuComponent,
        TaskSchedulerComponent
      ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        NgxDatatableModule,
        NgbModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [AuthGuard, TaskService, AuthenticationService]
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    userModel = TestBed.get(UserModel);
    guard = TestBed.get(AuthGuard);
  });


  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should call route guard and let the user pass', () => {
    spyOn(userModel, 'validateUser').and.returnValue(true);
    const result = guard.canActivate(null,null);
    expect(result ).toBeTruthy();
  });

  it('should call route guard and redirect user not logged in', inject([AuthGuard], (guard: AuthGuard) => {
    spyOn(userModel, 'validateUser').and.returnValue(false);
    spyOn(router, 'navigate');
    const result = guard.canActivate(null,null);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  }));


});

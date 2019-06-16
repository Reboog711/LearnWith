import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {AppComponent} from "../../app.component";
import {TasksComponent} from "../tasks/tasks.component";
import {TaskGridComponent} from "../task-grid/task-grid.component";
import {TaskFilterComponent} from "../task-filter/task-filter.component";
import {TaskCuComponent} from "../task-cu/task-cu.component";
import {TaskSchedulerComponent} from "../task-scheduler/task-scheduler.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../app-routing.module";
import {FormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthGuard} from "../../guards/auth.guard";
import {AuthenticationService} from "../../services/mock/authentication.service";
import {TaskService} from "../../services/mock/task.service";
import {Router} from "@angular/router";
import {UserModel} from "../../model/user-model";
import {ResultObjectVO} from "../../../../../task-manager-bak/app/vo/result-object-vo";
import {UserVO} from "../../../../../task-manager-bak/app/vo/user-vo";
import {Observable, Observer} from "rxjs";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authenticationService: AuthenticationService;
  let userModel: UserModel;
  let router: Router;

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
      providers: [
        AuthGuard,
        AuthenticationService,
        TaskService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authenticationService = TestBed.get(AuthenticationService);
    userModel = TestBed.get(UserModel);
    router =TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('onReset()', function() {
    it('Values turned to empty strings', function () {
      component.username = 'username';
      component.password = 'password';
      component.onReset();
      expect(component.username).toBe('');
      expect(component.password).toBe('');
    });
  });
  describe('onLogin()', function() {
    it('No Username', function () {
      component.username = '';
      component.password = '';
      component.onLogin();
      expect(component.usernameError).toBe('You Must Enter a Username');
    });
    it('No Password', function () {
      component.username = '';
      component.password = '';
      component.onLogin();
      expect(component.passwordError).toBe('You Must Enter a Password');
    });
    it('Failure', function () {
      component.username = 'me';
      component.password = 'me';
      let result : ResultObjectVO = new ResultObjectVO();
      result.error = false;
      let o : Observable<ResultObjectVO>;
      spyOn(authenticationService, 'authenticate').and.returnValue(
        Observable.create((observer : Observer<ResultObjectVO>) => {
          let result : ResultObjectVO = new ResultObjectVO();
          result.error = true;
          observer.next(result);
          observer.complete();
        })
      );
      component.onLogin();
      expect(component.loginError).toBe('We could not log you in');
    });

    it('Success', function () {
      component.username = 'me';
      component.password = 'me';
      spyOn(router,'navigate').and.returnValue(new Promise(() => true));

      spyOn(authenticationService, 'authenticate').and.returnValue(
        Observable.create((observer : Observer<ResultObjectVO>) => {
          let result : ResultObjectVO = new ResultObjectVO();
          result.error = false;
          result.resultObject = new UserVO();
          result.resultObject.userID = 1;
          result.resultObject.username = "me";
          result.resultObject.roleID = 1;
          observer.next(result);
          observer.complete();
        })
      );
      component.onLogin();
      expect(component.loginError).toBe('');
      expect(userModel.user.userID).toBe(1);
      expect(userModel.user.username).toBe("me");
      expect(userModel.user.roleID).toBe(1);
      expect(router.navigate).toHaveBeenCalledWith(['/tasks']);
    });
  });
});

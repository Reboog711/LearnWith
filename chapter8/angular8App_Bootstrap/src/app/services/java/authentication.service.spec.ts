import {async, TestBed} from '@angular/core/testing';

import { AuthenticationServiceJava } from './authentication.service';
import {AuthenticationService} from "../mock/authentication.service";
import {AppComponent} from "../../app.component";
import {LoginComponent} from "../../views/login/login.component";
import {TasksComponent} from "../../views/tasks/tasks.component";
import {TaskGridComponent} from "../../views/task-grid/task-grid.component";
import {TaskFilterComponent} from "../../views/task-filter/task-filter.component";
import {TaskCuComponent} from "../../views/task-cu/task-cu.component";
import {TaskSchedulerComponent} from "../../views/task-scheduler/task-scheduler.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../app-routing.module";
import {FormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AuthGuard} from "../../guards/auth.guard";
import {TaskService} from "../mock/task.service";

describe('AuthenticationService Java', () => {
  const urlString = '/java/webapi/login';
  let authenticationService : AuthenticationService;
  let httpMock : HttpTestingController;

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
        {provide: AuthenticationService, useClass:AuthenticationServiceJava},
        TaskService
      ]
    }).compileComponents();
  }));
  beforeEach(()=>{
    authenticationService = TestBed.get(AuthenticationService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });

  describe('authenticate() ', function () {

    it('User Authentication Succeeds', () => {
      authenticationService.authenticate('me','me').subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject.userID).toBe(1);
          expect(value.resultObject.username).toBe("me");
          expect(value.resultObject.role).toBe(1);
        });
      const req = httpMock.expectOne(urlString);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body.password).toEqual('ab86a1e1ef70dff97959067b723c5c24');
      expect(req.request.body.username).toEqual('me');
      req.flush({"resultObject":{"role":1,"username":"me","userID":1},"error":0});

    });

    it('User Authentication Fails', () => {

      authenticationService.authenticate('wrong','wrong').subscribe(
        value => {
          expect(value.error).toBeTruthy();
        });
      const req = httpMock.expectOne(urlString);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body.password).toEqual('2bda2998d9b0ee197da142a0447f6725');
      expect(req.request.body.username).toEqual('wrong');
      req.flush({"error":1});

    });


  });

  afterEach(() => {
    httpMock.verify();
  });
});

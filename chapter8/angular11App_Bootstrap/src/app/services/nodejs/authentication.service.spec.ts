import { TestBed } from '@angular/core/testing';

import { AuthenticationServiceNodeJS } from './authentication.service';
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
import {AuthenticationService} from "../mock/authentication.service";
import {TaskService} from "../mock/task.service";

describe('AuthenticationService', () => {
  const urlString = '/nodejs/login?';
  let service: AuthenticationServiceNodeJS;
  let httpMock : HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
  });

  beforeEach(()=>{
    service = TestBed.inject(AuthenticationServiceNodeJS);
    httpMock = TestBed.get(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('authenticate() ', () => {
    it('Should Return Success ResultObjectVO when authentication Succeeds', () => {
      service.authenticate('me','me').subscribe(
        value => {
          expect(value.error).toBeFalsy();
          expect(value.resultObject.userID).toBe(1);
          expect(value.resultObject.username).toBe("me");
          expect(value.resultObject.role).toBe(1);
        });
      let url = urlString + 'username=me&password=ab86a1e1ef70dff97959067b723c5c24';
      const req = httpMock.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush({"resultObject":{"role":1,"username":"me","userID":1},"error":0});
    });

    it('Should Return Failure ResultObjectVO when authentication Succeeds', () => {
      service.authenticate('wrong','wrong').subscribe(
        value => {
          expect(value.error).toBeTruthy();
        });
      let url = urlString + 'username=wrong&password=2bda2998d9b0ee197da142a0447f6725';
      const req = httpMock.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush({"error":1});
    });


    afterEach(() => {
      httpMock.verify();
    });
  });
});

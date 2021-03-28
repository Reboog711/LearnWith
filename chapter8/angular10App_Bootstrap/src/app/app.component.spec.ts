import {TestBed, async, fakeAsync, tick} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {AuthenticationService} from "./services/mock/authentication.service";
import {AuthGuard} from "./guards/auth.guard";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {LoginComponent} from "./views/login/login.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {TaskCuComponent} from "./views/task-cu/task-cu.component";
import {TaskFilterComponent} from "./views/task-filter/task-filter.component";
import {TaskGridComponent} from "./views/task-grid/task-grid.component";
import {TaskSchedulerComponent} from "./views/task-scheduler/task-scheduler.component";
import {TasksComponent} from "./views/tasks/tasks.component";
import {TaskService} from "./services/mock/task.service";

import {Location} from "@angular/common";
import {Router } from "@angular/router";
import {UserModel} from "./model/user-model";
import {routes} from "./app-routing.module";
describe('AppComponent', () => {
  let comp: AppComponent;
  let location: Location;
  let router: Router;
  let taskService: TaskService
  let userModel: UserModel;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        NgxDatatableModule,
        NgbModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        LoginComponent,
        TasksComponent,
        TaskGridComponent,
        TaskFilterComponent,
        TaskCuComponent,
        TaskSchedulerComponent
      ],
      providers: [
        AuthGuard,
        AuthenticationService,
        TaskService
      ]
    }).compileComponents().then( () =>{
      comp  = TestBed.createComponent(AppComponent).componentInstance;
      router = TestBed.get(Router);
      router.initialNavigation();
      location = TestBed.get(Location);
      userModel = TestBed.get(UserModel);
    });

  }));

  it('should create the app', () => {
    expect(comp).toBeDefined();
  });

  describe('Router', () => {
    it('should create router', () =>
      expect(router).toBeDefined()
    );
    it('should route to default route', () => {
      expect(location.path()).toBe('/login');
    });
    it('should redirect you to /login when navigating to ""', fakeAsync(() => {
      router.navigate(['']);
      tick();
      expect(location.path()).toBe('/login');
    }));
    describe('navigate to "tasks"', function () {
      it('should allow navigation because user is logged in', fakeAsync(() => {
        spyOn(userModel, 'validateUser').and.returnValue(true);
        router.navigate(['tasks']);
        tick();
        expect(location.path()).toBe('/tasks');
      }));
      it('should not allow navigation because user is not logged in', fakeAsync(() => {
        spyOn(userModel, 'validateUser').and.returnValue(false);
        router.navigate(['tasks']);
        spyOn(router,'navigate').and.returnValue(new Promise (() => true));
        tick();
        expect(router.navigate).toHaveBeenCalledWith(['/']);
      }));
    });
  });
});

import {TestBed, async, fakeAsync, tick} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {LoginComponent} from "./views/login/login.component";
import {TasksComponent} from "./views/tasks/tasks.component";
import {TaskGridComponent} from "./views/task-grid/task-grid.component";
import {TaskFilterComponent} from "./views/task-filter/task-filter.component";
import {TaskCuComponent} from "./views/task-cu/task-cu.component";
import {TaskSchedulerComponent} from "./views/task-scheduler/task-scheduler.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthGuard} from "./guards/auth.guard";
import {AuthenticationService} from "./services/mock/authentication.service";
import {TaskService} from "./services/mock/task.service";
import {UserModel} from "./model/user-model";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

describe('AppComponent', () => {
  let comp: AppComponent;
  let location: Location;
  let router: Router;
  let userModel: UserModel;

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
    }).compileComponents().then( () =>{
      comp  = TestBed.createComponent(AppComponent).componentInstance;
      router = TestBed.get(Router);
      router.initialNavigation();
      location = TestBed.get(Location);
      userModel = TestBed.get(UserModel);
    });
  }));

  it('should create component', () => expect(comp).toBeDefined() );

  describe('Router', () => {

    it('should create router', () => expect(router).toBeDefined() );

    it('default router navigation', () => {
      expect(location.path()).toBe('/login');
    });

    it('navigate to "" redirects you to /login', fakeAsync(() => {
      router.navigate(['']);
      tick();
      expect(location.path()).toBe('/login');
    }));

    it('navigate to "login" redirects you to /login', fakeAsync(() => {
      router.navigate(['login']);
      tick();
      expect(location.path()).toBe('/login');
    }));

    describe('navigate to "tasks"', function () {

      it(' works because user is logged in', fakeAsync(() => {
        spyOn(userModel, 'validateUser').and.returnValue(true);
        router.navigate(['tasks']);
        tick();
        expect(location.path()).toBe('/tasks');
      }));

      // this errors out we need to do something to mock the TaskService and use the spyon to bypass the actual service calls
      it(' does not work because user is not logged in', fakeAsync(() => {
        spyOn(userModel, 'validateUser').and.returnValue(false);
        router.navigate(['tasks']);
        // the auth guard will call it's own router.navigate() function if the user is not signed in
        spyOn(router,'navigate').and.returnValue(new Promise(() => true));
        tick();
        expect(router.navigate).toHaveBeenCalledWith(['/']);
      }));
    });
  });
});

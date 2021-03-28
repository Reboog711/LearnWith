import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {LoginComponent} from "./views/login/login.component";
import {TasksComponent} from "./views/tasks/tasks.component";
import {TaskGridComponent} from "./views/task-grid/task-grid.component";
import {TaskFilterComponent} from "./views/task-filter/task-filter.component";
import {TaskSchedulerComponent} from "./views/task-scheduler/task-scheduler.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule} from "@angular/forms";
import {TaskCuComponent} from "./views/task-cu/task-cu.component";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AuthGuard} from "./guards/auth.guard";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthenticationService} from "./services/mock/authentication.service";
import {TaskService} from "./services/mock/task.service";
import {UserModel} from "./model/user-model";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {routes} from "./app-routing.module";

describe('AppComponent', () => {
  let comp: AppComponent;
  let location: Location;
  let router: Router;
  let taskService: TaskService
  let userModel: UserModel;

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
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule
      ],
      providers: [
        AuthGuard,
        AuthenticationService,
        TaskService
      ]
    }).compileComponents();

    comp  = TestBed.createComponent(AppComponent).debugElement.componentInstance;
    router = TestBed.inject(Router);
    router.initialNavigation();
    location = TestBed.inject(Location);
    userModel = TestBed.inject(UserModel);

  });

  it('should create component', () => {
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

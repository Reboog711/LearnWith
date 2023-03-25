import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {AppRoutingModule, routes} from "./app-routing.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {LoginComponent} from "./views/login/login.component";
import {TasksComponent} from "./views/tasks/tasks.component";
import {TaskGridComponent} from "./views/task-grid/task-grid.component";
import {TaskSchedulerComponent} from "./views/task-scheduler/task-scheduler.component";
import {TaskFilterComponent} from "./views/task-filter/task-filter.component";
import {AuthGuard} from "./guards/auth.guard";
import {UserService} from "./services/user.service";
import {Router} from "@angular/router";
import {UserModel} from "./model/user-model";
import {Location} from "@angular/common";
import {TaskService} from "./services/task.service";

describe('AppComponent', () => {
  let comp: AppComponent;
  let location: Location;
  let router: Router;
  let taskService: TaskService
  let userModel: UserModel;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        AppRoutingModule,
        HttpClientTestingModule,
        NgbModule,
        NgxDatatableModule
      ],
      declarations: [
        AppComponent,
        LoginComponent,
        TasksComponent,
        TaskGridComponent,
        TaskSchedulerComponent,
        TaskFilterComponent
      ],
      providers: [
        AuthGuard,
        UserService
      ]
    }).compileComponents();

    comp  = TestBed.createComponent(AppComponent).debugElement.componentInstance;
    router = TestBed.inject(Router);
    router.initialNavigation();
    location = TestBed.inject(Location);
    userModel = TestBed.inject(UserModel);


  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'task-manager'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('task-manager');
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

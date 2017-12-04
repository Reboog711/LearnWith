import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';

import {AppComponent} from "../../../../../src/com/dotComIt/learnWith/main/app.component";
import {TaskService} from "../../../../../src/com/dotComIt/learnWith/services/mock/task.service";
import {UserModel} from "../../../../../src/com/dotComIt/learnWith/model/usermodel";
import {ResultObjectVO} from "../../../../../src/com/dotComIt/learnWith/vo/ResultObjectVO";

import {TasksComponent} from "../../../../../src/com/dotComIt/learnWith/views/tasks/tasks.component";

describe('Routing Module', function () {
    let location: Location;
    let router: Router;
    let taskService : TaskService;
    let userModel : UserModel;
    let tasks : TasksComponent;

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            TestBed.createComponent(AppComponent);
            router = TestBed.get(Router);
            taskService = TestBed.get(TaskService);
            userModel = TestBed.get(UserModel);
            location = TestBed.get(Location);
            router.initialNavigation();
            tasks = TestBed.createComponent(TasksComponent).componentInstance;
        });
    }));

    it('should create component', () => expect(router).toBeDefined() );

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
        beforeEach(() => {
            spyOn(taskService, 'loadTaskCategories').and.returnValue(Observable.of(ResultObjectVO));
            spyOn(taskService, 'loadTasks').and.returnValue(Observable.of(ResultObjectVO));
        });

        it(' works because user is logged in', fakeAsync(() => {
            spyOn(userModel, 'validateUser').and.returnValue(true);
            router.navigate(['tasks']);
            tick();
            expect(location.path()).toBe('/tasks');
        }));

        it(' does not work because user is not logged in', fakeAsync(() => {
            spyOn(userModel, 'validateUser').and.returnValue(false);
//            router.navigate(['tasks']);
            spyOn(router,'navigate').and.returnValue({});
            // force ngOnInit() to run.  It did so w/o the force in Angular 4, but for some reason not firing in this A5 code
            tasks.ngOnInit();
            tick();
            expect(router.navigate).toHaveBeenCalledWith(['/login']);
        }));

    });

});

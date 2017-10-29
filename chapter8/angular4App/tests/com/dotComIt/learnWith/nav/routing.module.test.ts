import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';

import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';

import {AppComponent } from "../../../../../src/com/dotComIt/learnWith/main/app.component";
import {TaskService} from "../../../../../src/com/dotComIt/learnWith/services/mock/task.service";
import {UserModel} from "../../../../../src/com/dotComIt/learnWith/model/usermodel";
import {ResultObjectVO} from "../../../../../src/com/dotComIt/learnWith/vo/ResultObjectVO";


describe('Routing Module', function () {
    let location: Location;
    let router: Router;
    let taskService : TaskService;
    let userModel : UserModel;

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            // create components before setting up the router
            // this is an important order of operations because router has issues if the router-outlet component is not defined
            TestBed.createComponent(AppComponent);

            // set up router
            router = TestBed.get(Router);
            taskService = TestBed.get(TaskService);
            userModel = TestBed.get(UserModel);
            location = TestBed.get(Location);
            router.initialNavigation();
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

        // this errors out we need to do something to mock the TaskService and use the spyon to bypass the actual service calls
        it(' does not work because user is not logged in', fakeAsync(() => {
            spyOn(userModel, 'validateUser').and.returnValue(false);
            router.navigate(['tasks']);
            // the ngOnInit() in tasks.component will call it's own router.navigate()
            // if we do that then we get an error like this:
            // Error: 2 timer(s) still in the queue.
            // because the router.navigate() is not inside a fakeAsync call.
            // so after doing the initial routing (above) then mock router.navigate() so it doesn't force the whole test to fail
            spyOn(router,'navigate').and.returnValue({});
            tick();
            expect(router.navigate).toHaveBeenCalledWith(['/login']);
        }));
    });
});

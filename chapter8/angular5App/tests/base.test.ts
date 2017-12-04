import "core-js"
import "zone.js/dist/zone";
import "zone.js/dist/long-stack-trace-zone";
import "zone.js/dist/proxy";
import "zone.js/dist/sync-test";
import "zone.js/dist/jasmine-patch";
import "zone.js/dist/async-test";
import "zone.js/dist/fake-async-test";

import { TestBed } from "@angular/core/testing";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";

TestBed.initTestEnvironment(BrowserDynamicTestingModule,platformBrowserDynamicTesting());

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './com/dotComIt/learnWith/nav/routing.module.mock';
import { AppComponent } from '../src/com/dotComIt/learnWith/main/app.component';
import { LoginComponent} from '../src/com/dotComIt/learnWith/views/login/login.component';
import { TaskGrid} from '../src/com/dotComIt/learnWith/views/tasks/taskgrid.component';
import { TasksComponent} from '../src/com/dotComIt/learnWith/views/tasks/tasks.component';
import { TaskFilter} from '../src/com/dotComIt/learnWith/views/tasks/taskfilter.component';
import { TaskScheduler} from '../src/com/dotComIt/learnWith/views/tasks/taskscheduler.component';
import { TaskCU} from '../src/com/dotComIt/learnWith/views/tasks/taskcu.component';

import { UserModel} from "../src/com/dotComIt/learnWith/model/usermodel";
import { TaskModel} from "../src/com/dotComIt/learnWith/model/taskmodel";

import { AuthenticationService} from "../src/com/dotComIt/learnWith/services/mock/authentication.service";
import { TaskService} from "../src/com/dotComIt/learnWith/services/mock/task.service";

beforeEach(() => {
    TestBed.configureTestingModule({
        imports : [AppRoutingModule, FormsModule,
            NgbModule.forRoot(), NgxDatatableModule],
        declarations: [ AppComponent, LoginComponent, TasksComponent,
            TaskFilter, TaskGrid, TaskScheduler, TaskCU ],
        providers : [{provide: LocationStrategy, useClass:HashLocationStrategy},
            AuthenticationService, UserModel,TaskModel, TaskService
        ]
    }).overrideModule(BrowserDynamicTestingModule, {
        set: {
            entryComponents: [ TaskCU ]
        }
    })
});

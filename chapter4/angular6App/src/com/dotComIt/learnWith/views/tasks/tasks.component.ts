import {Component, ViewChild} from '@angular/core';
import {TaskGrid} from "./taskgrid.component";
import {TaskFilterVO} from "../../vo/TaskFilterVO";
@Component({
    selector: `tasks`,
    templateUrl : './com/dotComIt/learnWith/views/tasks/tasks.component.html',
    styleUrls: [ './com/dotComIt/learnWith/views/tasks/tasks.component.css' ]
})

export class TasksComponent {
    @ViewChild(TaskGrid)
    private taskgrid : TaskGrid;

    filterRequest(filter:TaskFilterVO):void {
        this.taskgrid.loadTasks(filter);
    }


}
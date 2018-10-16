import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {DatePipe} from "@angular/common";
import {TaskFilterVO} from "../../vo/TaskFilterVO";
import {UserVO} from "../../vo/UserVO";
import {TaskVO} from "../../vo/TaskVO";
import {isNumeric} from "rxjs/internal/util/isNumeric";

const servicePrefix : string = '../../php/';

@Injectable()
export class TaskServicePHP {
    options : Object;

    constructor(private http: HttpClient) {
        let optionHeaders : HttpHeaders = new HttpHeaders().set('Content-Type',
            'application/x-www-form-urlencoded; charset=UTF-8');
        this.options = {headers:optionHeaders};
    }

    loadTasks(taskFilter:TaskFilterVO) : Observable<any> {
        let datePipe: DatePipe = new DatePipe('en-US');

        let url : string = servicePrefix + 'com/dotComIt/learnWith/api/tasks/';
        let concatenator : string = "?";
        if ((taskFilter.completed !== null) &&
            (typeof taskFilter.completed !== "undefined")) {
            url += concatenator + "completed=" + taskFilter.completed;
            concatenator = "&";
        }
        if (taskFilter.startDate) {
            url += concatenator + "startDate=" +
                datePipe.transform(taskFilter.startDate, "M/d/yyyy");
            concatenator = "&";
        }
        if (taskFilter.endDate) {
            url += concatenator + "endDate=" +
                datePipe.transform(taskFilter.endDate, "M/d/yyyy");
            concatenator = "&";
        }
        if (taskFilter.scheduledEndDate) {
            url += concatenator + "scheduledEndDate=" +
                datePipe.transform(taskFilter.scheduledEndDate, "M/d/yyyy");
            concatenator = "&";
        }
        if (taskFilter.scheduledStartDate) {
            url += concatenator + "scheduledStartDate=" +
                datePipe.transform(taskFilter.scheduledStartDate, "M/d/yyyy");
            concatenator = "&";
        }
        if (taskFilter.taskCategoryID) {
            url += concatenator + "taskCategoryID=" + taskFilter.taskCategoryID;
            concatenator = "&";
        }
        if (taskFilter.scheduledEqualDate) {
            url += concatenator + "scheduledEqualDate=" +
                datePipe.transform(taskFilter.scheduledEqualDate, "M/d/yyyy");
            concatenator = "&";
        }

        return this.http.get(url);
    }

    loadTaskCategories(taskFilter:TaskFilterVO) : Observable<any> {
        let url : string = servicePrefix +
            'com/dotComIt/learnWith/api/taskCategories/';
        return this.http.get(url);
    }

    updateTask(task :TaskVO, user :UserVO): Observable<any> {
        if(!isNumeric(task.taskCategoryID)){
            task.taskCategoryID = 0;
        }
        if (task.taskID) {
            return this.updateTask_internal(task);
        } else {
            return this.createTask_internal(task, user);
        }
    };
    private createTask_internal(task :TaskVO, user :UserVO): Observable<any> {
        let parameters = {
            taskCategoryID: task.taskCategoryID,
            description: task.description,
            userID : user.userID
        };

        return this.http.post(servicePrefix + 'com/dotComIt/learnWith/api/task/',
            parameters,
            this.options);
    }
    private updateTask_internal(task :TaskVO): Observable<any> {
        let parameters = {
            taskID: task.taskID,
            taskCategoryID: task.taskCategoryID,
            description: task.description
        };
        return this.http.put(servicePrefix + 'com/dotComIt/learnWith/api/task/',
            parameters,
            this.options);
    }

    scheduleTask(task :TaskVO): Observable<any> {
        let parameters = {
            taskID: task.taskID,
        };
        if (task.dateScheduled) {
            parameters['dateScheduled'] = task.dateScheduled;
        }

        return this.http.put(servicePrefix +
            'com/dotComIt/learnWith/api/task/schedule/',
            parameters,
            this.options);
    };
    scheduleTaskList(tasks :TaskVO[], schedulerDate:Date): Observable<any> {
        let datePipe : DatePipe = new DatePipe('en-US');
        let taskIDList = '';
        for (let index = 0; index < tasks .length; ++index) {
            taskIDList += tasks [index].taskID + ",";
        }
        // remove last comma
        taskIDList = taskIDList.substr(0, taskIDList.length - 1);

        let parameters = {
            taskIDList : taskIDList,
            dateScheduled :  datePipe.transform(schedulerDate, 'shortDate')
        };

        return this.http.put(servicePrefix +
            'com/dotComIt/learnWith/api/task/schedule/',
            parameters,
            this.options);
    };

}

/**
 * Created by jhouser on 5/8/2017.
 */

import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers} from "@angular/http";

import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {ResultObjectVO} from "../../vo/ResultObjectVO";
import {TaskFilterVO} from "../../vo/TaskFilterVO";

import {DatePipe} from "@angular/common";
import {TaskVO} from "../../vo/TaskVO";
import {UserVO} from "../../vo/UserVO";
import {isNumeric} from "rxjs/util/isNumeric";

const servicePrefix : string = '/webapi/';

@Injectable()
export class TaskServiceJava {

    options : RequestOptions;

    constructor(private http: Http) {
        let optionHeaders : Headers = new Headers();
        optionHeaders.append('Content-Type', 'application/json');
        this.options = new RequestOptions({headers:optionHeaders});
    }



    loadTasks(taskFilter:TaskFilterVO) : Observable<ResultObjectVO> {
        let datePipe: DatePipe = new DatePipe('en-US');
        let url : string = servicePrefix + 'tasks';
        let concatenator : string = "?";

        if ((taskFilter.completed !== null) && (typeof taskFilter.completed !== "undefined")) {
            url += concatenator + "completed=" + taskFilter.completed;
            concatenator = "&";
        }
        if (taskFilter.endDate) {
            url += concatenator + "endDate=" + datePipe.transform(taskFilter.endDate, "yyyy-MM-dd");
            concatenator = "&";
        }
        if (taskFilter.scheduledEndDate) {
            url += concatenator + "scheduledEndDate=" + datePipe.transform(taskFilter.scheduledEndDate, "yyyy-MM-dd");
            concatenator = "&";
        }
        if (taskFilter.scheduledStartDate) {
            url += concatenator + "scheduledStartDate=" + datePipe.transform(taskFilter.scheduledStartDate, "yyyy-MM-dd");
            concatenator = "&";
        }
        if (taskFilter.scheduledEqualDate) {
            url += concatenator + "scheduledEqualDate=" + datePipe.transform(taskFilter.scheduledEqualDate, "yyyy-MM-dd");
            concatenator = "&";
        }
        if (taskFilter.startDate) {
            url += concatenator + "startDate=" + datePipe.transform(taskFilter.startDate, "yyyy-MM-dd");
            concatenator = "&";
        }
        if (taskFilter.taskCategoryID) {
            url += concatenator + "taskCategoryID=" + taskFilter.taskCategoryID;
            concatenator = "&";
        }

        return this.http.get(url)
            .map((result) => result.json());

    }

    loadTaskCategories(): Observable<ResultObjectVO> {
        let url : string = servicePrefix + 'taskCategories';
        return this.http.get(url)
            .map((result) => result.json());
    };

    private createTask_internal(task :TaskVO, user :UserVO): Observable<ResultObjectVO> {
        let parameters = {
            taskCategoryID: task.taskCategoryID,
            description: task.description,
            userID : user.userID
        };

        return this.http.post(servicePrefix + 'task',
            parameters,
            this.options)
            .map((result) => result.json() as ResultObjectVO);
    }

    private updateTask_internal(task :TaskVO): Observable<ResultObjectVO> {
        let parameters = {
            taskID: task.taskID,
            taskCategoryID: task.taskCategoryID,
            description: task.description
        };
        return this.http.put(servicePrefix + 'task',
            parameters,
            this.options)
            .map((result) => result.json() as ResultObjectVO);
    }


    updateTask(task :TaskVO, user :UserVO): Observable<ResultObjectVO> {
        if (!isNumeric(task.taskCategoryID)) {
            task.taskCategoryID = 0;
        }
        if (task.taskID) {
            return this.updateTask_internal(task);
        } else {
            return this.createTask_internal(task, user);
        }
    }


    scheduleTask(task :TaskVO): Observable<ResultObjectVO> {
        let datePipe : DatePipe = new DatePipe('en-US');
        let parameters = {
            taskID: task.taskID,
        };
        if (task.dateScheduled) {
            parameters['dateScheduled'] = datePipe.transform(task.dateScheduled, 'yyyy-MM-dd');
        }

        return this.http.put(servicePrefix + 'task/schedule',
            parameters,
            this.options)
            .map((result) => result.json() as ResultObjectVO);
    };

    scheduleTaskList(tasks :TaskVO[], schedulerDate:Date): Observable<ResultObjectVO> {
        let datePipe : DatePipe = new DatePipe('en-US');
        let taskIDList = '';
        for (let index = 0; index < tasks .length; ++index) {
            taskIDList += tasks [index].taskID + ",";
        }
        // remove last comma
        taskIDList = taskIDList.substr(0, taskIDList.length - 1);

        let parameters = {
            taskIDList : taskIDList,
            dateScheduled :  datePipe.transform(schedulerDate, 'yyyy-MM-dd')
        };

        return this.http.put(servicePrefix + 'task/schedule',
            parameters,
            this.options)
            .map((result) => result.json() as ResultObjectVO);
    };

    completeTask(task :TaskVO): Observable<ResultObjectVO> {
        let parameters = {
            taskID : task.taskID,
            completed :  !task.completed
        };

        return this.http.put(servicePrefix + 'task/complete',
            parameters,
            this.options)
            .map((result) => result.json() as ResultObjectVO);
    };

}
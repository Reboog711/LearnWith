/**
 * Created by jhouser on 5/8/2017.
 */

import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers} from "@angular/http";

import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {ResultObjectVO} from "../../vo/ResultObjectVO";
import {TaskFilterVO} from "../../vo/TaskFilterVO";

import {HttpUtils} from "./httpUtils";
import {TaskVO} from "../../vo/TaskVO";
import {UserVO} from "../../vo/UserVO";
import {isNumeric} from "rxjs/util/isNumeric";
import {DatePipe} from "@angular/common";

const servicePrefix : string = '../../coldFusion/';

@Injectable()
export class TaskServiceCF {

    options : RequestOptions;

    constructor(private http: Http) {
        let optionHeaders : Headers = new Headers();
        optionHeaders.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        this.options = new RequestOptions({headers:optionHeaders});
    }


    loadTaskCategories(): Observable<ResultObjectVO> {
        let parameters = {
            method : "getTaskCategories"
        };
        return this.http.post(servicePrefix + 'com/dotComIt/learnWith/services/TaskService.cfc',
            HttpUtils.transformRequest(parameters), this.options)
            .map((result) => {
                // some juggling since the CF code is already adding the all categories object which for this app we did in the UI
                // the server side code and client side code was cropped out of the Angular 4 book
                let r = result.json() as ResultObjectVO;
                r.resultObject.shift();
                return r;
            } );
    };

    loadTasks(taskFilter:TaskFilterVO) : Observable<ResultObjectVO> {
        console.log('in loadtask  CF');
        console.log(taskFilter);
        let parameters : Object = {
            method : "getFilteredTasks",
            filter : taskFilter
        };
        console.log('parameters');
        console.log(parameters);

        return this.http.post(servicePrefix + 'com/dotComIt/learnWith/services/TaskService.cfc',
            HttpUtils.transformRequest(parameters), this.options)
            .map((result) => result.json());

    }

    updateTask(task :TaskVO, user :UserVO): Observable<ResultObjectVO> {
        console.log('in update task CF');
        let method : string = "createTask";
        if (task.taskID) {
            method = "updateTask";
        };

        if (!isNumeric(task.taskCategoryID)) {
            task.taskCategoryID = 0;
        };


        let parameters = {
            method : method,
            taskCategoryID : task.taskCategoryID,
            description : task.description,
            taskID : task.taskID,
            userID : user.userID
        };

        console.log('Update Task parameters');
        console.log(parameters);

        return this.http.post(servicePrefix + 'com/dotComIt/learnWith/services/TaskService.cfc',
            HttpUtils.transformRequest(parameters), this.options)
            .map((result) => result.json() as ResultObjectVO);

    }

    scheduleTask(task :TaskVO): Observable<ResultObjectVO> {
        let parameters = {
            method : "scheduleTask",
            taskID : task.taskID,
        };
        if ( task.dateScheduled ) {
            parameters['dateScheduled'] = task.dateScheduled;
        }

        return this.http.post(servicePrefix + 'com/dotComIt/learnWith/services/TaskService.cfc',
            HttpUtils.transformRequest(parameters), this.options)
            .map((result) => result.json() as ResultObjectVO);
    };

    scheduleTaskList(tasks :TaskVO[], schedulerDate:Date): Observable<ResultObjectVO> {
        let datePipe : DatePipe = new DatePipe('en-US');
        let taskIDList = '';
        for (let index = 0; index < tasks .length; ++index) {
            taskIDList += tasks [index].taskID + ",";
        }

        let parameters = {
            method : "scheduleTaskList",
            taskIDList : taskIDList,
            dateScheduled :  datePipe.transform(schedulerDate, 'shortDate')
        };

        return this.http.post(servicePrefix + 'com/dotComIt/learnWith/services/TaskService.cfc',
            HttpUtils.transformRequest(parameters), this.options)
            .map((result) => result.json() as ResultObjectVO);
    };

    completeTask(task :TaskVO): Observable<ResultObjectVO> {
        let parameters = {
            method : "completeTask",
            taskID  : task.taskID,
            completed  :  !task.completed
        };

        return this.http.post(servicePrefix + 'com/dotComIt/learnWith/services/TaskService.cfc',
            HttpUtils.transformRequest(parameters), this.options)
            .map((result) => result.json() as ResultObjectVO);
    };


}
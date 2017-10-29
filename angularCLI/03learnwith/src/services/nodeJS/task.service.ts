/**
 * Created by jhouser on 5/11/2017.
 */

import {Injectable} from "@angular/core";
import {Jsonp} from "@angular/http";
import {HttpUtils} from "./httpUtils";

import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {ResultObjectVO} from "../../vo/ResultObjectVO";
import {TaskFilterVO} from "../../vo/TaskFilterVO";
import {TaskVO} from "../../vo/TaskVO";

import {isNumeric} from "rxjs/util/isNumeric";
import {UserVO} from "../../vo/UserVO";
import {DatePipe} from "@angular/common";


const SERVER : string = 'http://127.0.0.1:8080/';

@Injectable()
export class TaskServiceNodeJS {


    constructor(private jsonp: Jsonp) {
    }

    loadTasks(taskFilter : TaskFilterVO) : Observable<ResultObjectVO> {
        console.log('in load tasks NodeJS');
        let parameters : string =  "filter" + '=' + HttpUtils.objToJSONString(taskFilter) + '&';
        parameters += "callback" + "=" + "JSONP_CALLBACK";

        let url = SERVER + 'taskService/getFilteredTasks?' + parameters;

        return this.jsonp.request(url)
            .map((result) => result.json() as ResultObjectVO);
    }

    loadTaskCategories() : Observable<ResultObjectVO> {
        console.log('in load task categories NodeJS');

        let parameters = "callback" + "=" + "JSONP_CALLBACK" ;
        let url = SERVER + 'taskService/getTaskCategories?' + parameters;

        return this.jsonp.request(url)
/*            .map((result) => result.json() as ResultObjectVO);*/
            .map((result) => {
            // some juggling since the NodeJS code is already adding the all categories object which for this app we did in the UI
            // the server side code and client side code was cropped out of the Angular 4 book
            let r = result.json() as ResultObjectVO;
            r.resultObject.shift();
            return r;
        } );
    }

    updateTask(task:TaskVO, user :UserVO) : Observable<ResultObjectVO> {
        console.log('in update task NodeJS');

        if (!isNumeric(task.taskCategoryID)) {
            task.taskCategoryID = 0;
        };

        let parameters = "taskCategoryID" + "=" + task.taskCategoryID + '&';
        parameters +=   "description" + "=" + task.description + '&';
        parameters +=   "callback" + "=" + "JSONP_CALLBACK" + '&';


        let method : string = "createTask";
        if (task.taskID) {
            method = "updateTask";
            parameters +=   "taskID" + "=" + task.taskID + '&';
        } else {
            parameters +=   "userID" + "=" + user.userID + '&';
        };

        let url = SERVER + 'taskService/' + method + '?' + parameters;

        return this.jsonp.request(url)
            .map((result) => result.json() as ResultObjectVO);
    }

    scheduleTask(task :TaskVO): Observable<ResultObjectVO> {
        let parameters = "taskID" + "=" + task.taskID + '&';
        if (task.dateScheduled) {
            parameters +=   "dateScheduled" + "=" + task.dateScheduled + '&';
        }
        parameters +=   "callback" + "=" + "JSONP_CALLBACK" ;
        let url = SERVER + 'taskService/scheduleTask?' + parameters;

        return this.jsonp.request(url)
            .map((result) => result.json() as ResultObjectVO);
    };

    scheduleTaskList(tasks :TaskVO[], schedulerDate:Date): Observable<ResultObjectVO> {
        let datePipe : DatePipe = new DatePipe('en-US');
        let taskIDList = '';
        for (let index = 0; index < tasks .length; ++index) {
            taskIDList += tasks [index].taskID + ",";
        }
        taskIDList = taskIDList.substr( 0, taskIDList.length - 1 );


        let parameters = "taskIDList" + "=" + taskIDList + '&';
        parameters += "dateScheduled" + "=" + datePipe.transform(schedulerDate, 'shortDate') + '&';
        parameters +=   "callback" + "=" + "JSONP_CALLBACK" ;

        let url = SERVER + 'taskService/scheduleTaskList?' + parameters;

        return this.jsonp.request(url)
            .map((result) => result.json() as ResultObjectVO);
    };

    completeTask(task:TaskVO) : Observable<ResultObjectVO> {
        let parameters = "taskID" + "=" + task.taskID + '&';
        console.log(task.completed);
        console.log(!task.completed);
/*        if (!task.completed ) {
            parameters += "completed" + "=" + 'true' + '&';
        } else {
            parameters += "completed" + "=" + 'false' + '&';
        }*/
        parameters += "completed" + "=" + !task.completed + '&';
        parameters +=   "callback" + "=" + "JSONP_CALLBACK" ;

        console.log(parameters);

        let url = SERVER + 'taskService/completeTask?' + parameters;

        return this.jsonp.request(url)
            .map((result) => result.json() as ResultObjectVO);
    }


}

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs/Observable";
import {TaskFilterVO} from "../../vo/TaskFilterVO";
import {HttpUtils} from "./httpUtils";

import {ResultObjectVO} from "../../vo/ResultObjectVO";
import {Observer} from "rxjs/Observer";

import {UserVO} from "../../vo/UserVO";
import {TaskVO} from "../../vo/TaskVO";
import {isNumeric} from "rxjs/util/isNumeric";
import {DatePipe} from "@angular/common";

const SERVER : string = 'http://127.0.0.1:8080/';
const callback : string = 'JSONP_CALLBACK';

@Injectable()
export class TaskServiceNodeJS {

    constructor(private http: HttpClient) {
    }

    loadTasks(taskFilter : TaskFilterVO) : Observable<any> {
        let parameters : string =  "filter" + '=' +
            HttpUtils.objToJSONString(taskFilter) + '&';
        parameters += "callback" + "=" + callback;
        let url = SERVER + 'taskService/getFilteredTasks?' + parameters;
        return this.http.jsonp(url, callback);
    }

    loadTaskCategories() : Observable<any> {
        let parameters = "callback" + "=" + callback ;
        let url = SERVER + 'taskService/getTaskCategories?' + parameters;

        /* Actual Book Code
        return this.http.jsonp(url, callback);
        */

        // A more complex version left out of book, but in here for legacy purposes
        // The server shouldn't be adding the 'empty category' object, but it does
        // So, this is some juggling to remove that for the Angular 4+ apps
        // the server side code and client side code was cropped out of the Angular 4 book, but is still in the Angular 1 book
        let o : Observable<any> = Observable.create(
            (observer : Observer<ResultObjectVO>) => {
                this.http.jsonp(url, callback)
                    .subscribe(
                        result => {
                            var r: ResultObjectVO = result as ResultObjectVO;
                            (r).resultObject.shift();
                            observer.next(r);
                            observer.complete();
                        }
                    );
            });

        return o;

    }

    updateTask(task :TaskVO, user :UserVO): Observable<any> {
        if ( !isNumeric(task.taskCategoryID)) {
            task.taskCategoryID = 0;
        }

        let parameters = "taskCategoryID" + "=" + task.taskCategoryID + '&';
        parameters +=   "description" + "=" + task.description + '&';
        parameters +=   "callback" + "=" + callback + '&';

        let method : string = "createTask";
        if (task.taskID) {
            method = "updateTask";
            parameters +=   "taskID" + "=" + task.taskID + '&';
        } else {
            parameters +=   "userID" + "=" + user.userID + '&';
        };

        let url = SERVER + 'taskService/' + method + '?' + parameters;

        return this.http.jsonp(url, callback);
    };


}

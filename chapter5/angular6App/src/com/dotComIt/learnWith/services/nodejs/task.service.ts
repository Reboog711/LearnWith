import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {HttpUtils} from "./httpUtils";
import {Observable} from "rxjs/index";
import {TaskFilterVO} from "../../vo/TaskFilterVO";
import {UserVO} from "../../vo/UserVO";
import {TaskVO} from "../../vo/TaskVO";
import {isNumeric} from "rxjs/internal/util/isNumeric";

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
        return this.http.jsonp(url,callback);
    }

    loadTaskCategories() : Observable<any> {
        let parameters = "callback" + "=" + callback ;
        let url = SERVER + 'taskService/getTaskCategories?' + parameters;
        return this.http.jsonp(url, callback)
    }

    updateTask(task :TaskVO, user :UserVO): Observable<any> {
        if(!isNumeric(task.taskCategoryID)) {
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
        return this.http.jsonp(url,callback);
    };


}

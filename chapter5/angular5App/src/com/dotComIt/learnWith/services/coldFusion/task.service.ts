import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {TaskFilterVO} from "../../vo/TaskFilterVO";
import {HttpUtils} from "./httpUtils";
import {UserVO} from "../../vo/UserVO";
import {TaskVO} from "../../vo/TaskVO";
import {isNumeric} from "rxjs/util/isNumeric";
import {ResultObjectVO} from "../../vo/ResultObjectVO";
import {Observer} from "rxjs/Observer";


const servicePrefix : string = '../../coldFusion/';

@Injectable()
export class TaskServiceCF {
    options : Object;

    constructor(private http: HttpClient) {
        let optionHeaders : HttpHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        this.options = {headers:optionHeaders};
    }

    loadTasks(taskFilter:TaskFilterVO) : Observable<any> {
        let parameters : Object = {
            method : "getFilteredTasks",
            filter : taskFilter
        };
        return this.http.post(servicePrefix +
            'com/dotComIt/learnWith/services/TaskService.cfc',
            HttpUtils.transformRequest(parameters),
            this.options);
    }


    loadTaskCategories(): Observable<any> {
        let parameters = {
            method : "getTaskCategories"
        };

        /*
        Actual book code
                return this.http.post(servicePrefix + 'com/dotComIt/learnWith/services/TaskService.cfc',
            HttpUtils.transformRequest(parameters),
            this.options);
         */

        // A more complex version left out of book, but in here for legacy purposes
        // The server shouldn't be adding the 'empty category' object, but it does
        // So, this is some juggling to remove that for the Angular 4+ apps
        // the server side code and client side code was cropped out of the Angular 4 book, but is still in the Angular 1 book
        let o : Observable<any> = Observable.create(
            (observer : Observer<ResultObjectVO>) => {
                this.http.post(servicePrefix + 'com/dotComIt/learnWith/services/TaskService.cfc',
                    HttpUtils.transformRequest(parameters),
                    this.options)
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
    };

    updateTask(task :TaskVO, user :UserVO): Observable<any> {
        let method : string = "createTask";
        if (task.taskID) {
            method = "updateTask";
        }
        if (!isNumeric(task.taskCategoryID)) {
            task.taskCategoryID = 0;
        }
        let parameters = {
            method: method,
            taskCategoryID: task.taskCategoryID,
            description: task.description,
            taskID: task.taskID,
            userID : user.userID
        };
        return this.http.post(servicePrefix + 'com/dotComIt/learnWith/services/TaskService.cfc',
            HttpUtils.transformRequest(parameters),
            this.options);

    };




}

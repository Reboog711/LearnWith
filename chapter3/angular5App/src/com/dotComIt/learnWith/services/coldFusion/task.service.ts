import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {TaskFilterVO} from "../../vo/TaskFilterVO";
import {HttpUtils} from "./httpUtils";

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



}

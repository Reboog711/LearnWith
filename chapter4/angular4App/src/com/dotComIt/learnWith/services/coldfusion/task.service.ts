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
        let parameters : Object = {
            method : "getFilteredTasks",
            filter : taskFilter
        };
        console.log('parameters');


        return this.http.post(servicePrefix + 'com/dotComIt/learnWith/services/TaskService.cfc',
            HttpUtils.transformRequest(parameters), this.options)
            .map((result) => result.json());

    }
}
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
        if (taskFilter.startDate) {
            url += concatenator + "startDate=" + datePipe.transform(taskFilter.startDate, "yyyy-MM-dd");
            concatenator = "&";
        }

        return this.http.get(url)
            .map((result) => result.json());

    }
}
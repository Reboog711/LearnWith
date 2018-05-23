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

}
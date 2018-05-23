import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {TaskFilterVO} from "../../vo/TaskFilterVO";
import {DatePipe} from "@angular/common";

const servicePrefix : string = '/webapi/';

@Injectable()
export class TaskServiceJava {
    options : Object;

    constructor(private http: HttpClient) {
        let optionHeaders : HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
        this.options = {headers:optionHeaders};
    }

    loadTasks(taskFilter:TaskFilterVO) : Observable<any> {
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

        return this.http.get(url);
    }


}

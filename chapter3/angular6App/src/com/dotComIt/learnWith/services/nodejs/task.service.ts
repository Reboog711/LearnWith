import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {HttpUtils} from "./httpUtils";
import {Observable} from "rxjs/index";
import {TaskFilterVO} from "../../vo/TaskFilterVO";

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
}

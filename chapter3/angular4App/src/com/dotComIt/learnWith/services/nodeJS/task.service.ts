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
}

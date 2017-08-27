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

    loadTaskCategories() : Observable<ResultObjectVO> {
        console.log('in load task categories NodeJS');

        let parameters = "callback" + "=" + "JSONP_CALLBACK" ;
        let url = SERVER + 'taskService/getTaskCategories?' + parameters;

        return this.jsonp.request(url)
/*            .map((result) => result.json() as ResultObjectVO);*/
            .map((result) => {
            // some juggling since the NodeJS code is already adding the all categories object which for this app we did in the UI
            // the server side code and client side code was cropped out of the Angular 4 book
            let r = result.json() as ResultObjectVO;
            r.resultObject.shift();
            return r;
        } );

    }

}

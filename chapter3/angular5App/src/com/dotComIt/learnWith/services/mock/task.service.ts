import {Injectable} from "@angular/core";
import {TaskVO} from "../../vo/TaskVO";
import {Observable} from "rxjs/Observable";
import {ResultObjectVO} from "../../vo/ResultObjectVO";
import {TaskFilterVO} from "../../vo/TaskFilterVO";
import {Observer} from "rxjs/Observer";


@Injectable()
export class TaskService {
    tasks : TaskVO[] = [];

    createMockDataStore() {
        let task : TaskVO = {taskCategoryID:1, taskCategory:"Business", description:'Copy edit Chapter 1',
            dateScheduled: new Date("4/17/2017"),
            dateCompleted:null, taskID:24, dateCreated:new Date("12/05/2017"), completed:false, userID:1} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:1, taskCategory:"Business", description:"Finish Chapter 2", dateScheduled: new Date("4/17/2017"),
            dateCompleted:null, taskID:2, dateCreated: new Date("3/28/2017"), completed:false, userID:1} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:1, taskCategory:"Business", description:"Write Code for Chapter 3", dateScheduled: new Date("3/29/2017"),
            dateCompleted:null, taskID:3, dateCreated: new Date("3/29/2017"), completed:false, userID:1} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:1, taskCategory:"Business", description:"Write Chapter 4", dateScheduled: new Date("3/20/2017"),
            dateCompleted:null, taskID:4, dateCreated: new Date("3/30/2017"), completed:true, userID:1} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:1, taskCategory:"Business", description:"Plan Chapter 5", dateScheduled: new Date("3/20/2017"),
            dateCompleted:null, taskID:5, dateCreated: new Date("3/28/2017"), completed:false, userID:1} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:1, taskCategory:"Business", description:"Create React Proof of Concept", dateScheduled: null,
            dateCompleted:null, taskID:6, dateCreated: new Date("3/31/2017"), completed:false, userID:1} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:1, taskCategory:"Business", description:"Do Something", dateScheduled: new Date("11/24/2016"),
            dateCompleted:null, taskID:7, dateCreated: new Date("5/09/2017"), completed:false, userID:1} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:2, taskCategory:"Personal", description:"Buy Milk", dateScheduled: new Date("2/11/2017"),
            dateCompleted:null, taskID:8, dateCreated: new Date("5/09/2017"), completed:false, userID:1} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:2, taskCategory:"Personal", description:"Buy Eggs", dateScheduled: new Date("11/24/2017"),
            dateCompleted:null, taskID:9, dateCreated: new Date("5/09/2017"), completed:false, userID:1} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:2, taskCategory:"Personal", description:"Clean Kitchen", dateScheduled: new Date("11/21/2017"),
            dateCompleted:null, taskID:10, dateCreated: new Date("5/09/2017"), completed:false, userID:1} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:2, taskCategory:"Personal", description:"Do Laundry", dateScheduled: new Date("11/24/2017"),
            dateCompleted:null, taskID:11, dateCreated: new Date("5/09/2017"), completed:true, userID:1} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:2, taskCategory:"Personal", description:"Wish Mom a Happy Birthday!", dateScheduled: new Date("11/22/2017"),
            dateCompleted:null, taskID:12, dateCreated: new Date("5/09/2017"), completed:false, userID:1} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:1, taskCategory:"Business", description:"Followup with client on project",
            dateScheduled: new Date("11/22/2016"),
            dateCompleted:null, taskID:13, dateCreated: new Date("5/14/2017"), completed:false, userID:1} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:2, taskCategory:"Personal", description:"Call Brother", dateScheduled: new Date("11/22/2017"),
            dateCompleted:null, taskID:14, dateCreated: new Date("5/27/2017"), completed:false, userID:2} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:2, taskCategory:"Personal", description:"Call Sister", dateScheduled: new Date("11/22/2017"),
            dateCompleted:null, taskID:15, dateCreated: new Date("5/27/2017"), completed:false, userID:2} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:1, taskCategory:"Business", description:"Start Chapter 6", dateScheduled: null,
            dateCompleted:null, taskID:16, dateCreated: new Date("11/13/2017"), completed:false, userID:1} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:null, taskCategory:"", description:"Update build scripts", dateScheduled: null,
            dateCompleted:null, taskID:17, dateCreated: new Date("11/16/2017"), completed:true, userID:1} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:1, taskCategory:"Business", description:"Update StackOverflow Profile", dateScheduled: null,
            dateCompleted:null, taskID:18, dateCreated: new Date("11/16/2017"), completed:false, userID:1} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:2, taskCategory:"Personal", description:"Sweep Floor", dateScheduled: null,
            dateCompleted:null, taskID:19, dateCreated: new Date("11/16/2017"), completed:false, userID:1} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:1, taskCategory:"Business", description:"Submit proposal to conference", dateScheduled: null,
            dateCompleted:null, taskID:20, dateCreated: new Date("11/16/2017"), completed:false, userID:1} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:2, taskCategory:"Personal", description:"Fold laundry", dateScheduled: null,
            dateCompleted:null, taskID:21, dateCreated: new Date("11/16/2017"), completed:false, userID:1} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:1, taskCategory:"Business", description:"Brainstorm new business opportunities", dateScheduled: null,
            dateCompleted:null, taskID:22, dateCreated: new Date("12/05/2017"), completed:false, userID:1} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:1, taskCategory:"Business", description:"Write Blog Post", dateScheduled: null,
            dateCompleted:null, taskID:23, dateCreated: new Date("12/05/2017"), completed:false, userID:1} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:1, taskCategory:"Business", description:"Plan new Blog Post", dateScheduled: null,
            dateCompleted:null, taskID:24, dateCreated: new Date("12/05/2017"), completed:false, userID:1} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:2, taskCategory:"Personal", description:"Schedule Hike", dateScheduled: null,
            dateCompleted:null, taskID:25, dateCreated: new Date("12/05/2017"), completed:false, userID:1} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:1, taskCategory:"Business", description:"Exercise", dateScheduled: null,
            dateCompleted:null, taskID:26, dateCreated: new Date("12/05/2017"), completed:true, userID:1} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:1, taskCategory:"Business", description:"Pay Bills", dateScheduled: null,
            dateCompleted:null, taskID:27, dateCreated: new Date("12/05/2017"), completed:false, userID:1} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:2, taskCategory:"Personal", description:"Trim Netflix Queue", dateScheduled: null,
            dateCompleted:null, taskID:28, dateCreated: new Date("12/05/2017"), completed:false, userID:1} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:1, taskCategory:"Business", description:"Invoice clients", dateScheduled: null,
            dateCompleted:null, taskID:29, dateCreated: new Date("12/07/2017"), completed:true, userID:0} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:null, taskCategory:"", description:"Research new tech", dateScheduled: null,
            dateCompleted:null, taskID:30, dateCreated: new Date("12/12/2017"), completed:true, userID:1} as TaskVO;
        this.tasks.push(task);
        task = {taskCategoryID:null, taskCategory:"", description:"Call back client", dateScheduled: null,
            dateCompleted:null, taskID:31, dateCreated: new Date("2/11/2017"), completed:false, userID:1} as TaskVO;
        this.tasks.push(task);

    };

    constructor() {
        this.createMockDataStore();
    }

    loadTasks(filter : TaskFilterVO) : Observable<ResultObjectVO> {
        let o : Observable<ResultObjectVO> = Observable.create(
            (observer : Observer<ResultObjectVO>) => {
                setTimeout(() => {
                    let result : ResultObjectVO = new ResultObjectVO();
                    result.resultObject = this.tasks.filter(
                        function(element, index, array){
                            if (!(typeof filter.completed === 'undefined') &&
                                (filter.completed !== null)) {
                                if (filter.completed !== element.completed) {
                                    return false;
                                }
                            };
                            if (filter.startDate) {
                                if (filter.startDate > element.dateCreated) {
                                    return false;
                                }
                            }
                            return true;
                        }
                    );
                    result.error = false;
                    observer.next(result);
                    observer.complete();

                }, 1000);
            });
        return o;
    }


}

import { Injectable } from '@angular/core';
import {TaskVO} from "../../vo/task-vo";

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  tasks : TaskVO[] = [];
  constructor() {
    this.createMockDataStore();
  }


  createMockDataStore(){
    let task : TaskVO =
      Object.assign(new TaskVO(), {taskCategoryID:1, taskCategory:"Business", description:'Copy edit Chapter 1',
        dateScheduledAsUTCString: new Date("4/17/2021").toISOString(),
        dateCompletedAsUTCString:null, taskID:24, dateCreatedAsUTCString:new Date("12/05/2021").toISOString(), completed:false, userID:1});
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:1, taskCategory:"Business", description:"Finish Chapter 2", dateScheduledAsUTCString: new Date("4/17/2021").toISOString(),
      dateCompletedAsUTCString:null, taskID:2, dateCreatedAsUTCString: new Date("3/28/2021").toISOString(), completed:false, userID:1});;
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:1, taskCategory:"Business", description:"Write Code for Chapter 3", dateScheduledAsUTCString: new Date("3/29/2021").toISOString(),
      dateCompletedAsUTCString:null, taskID:3, dateCreatedAsUTCString: new Date("3/29/2021").toISOString(), completed:false, userID:1});;
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:1, taskCategory:"Business", description:"Write Chapter 4", dateScheduledAsUTCString: new Date("3/20/2021").toISOString(),
      dateCompletedAsUTCString:null, taskID:4, dateCreatedAsUTCString: new Date("3/30/2021").toISOString(), completed:true, userID:1});;
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:1, taskCategory:"Business", description:"Plan Chapter 5", dateScheduledAsUTCString: new Date("3/20/2021").toISOString(),
      dateCompletedAsUTCString:null, taskID:5, dateCreatedAsUTCString: new Date("3/28/2021").toISOString(), completed:false, userID:1});;
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:1, taskCategory:"Business", description:"Create React Proof of Concept", dateScheduledAsUTCString: null,
      dateCompletedAsUTCString:null, taskID:6, dateCreatedAsUTCString: new Date("3/31/2021").toISOString(), completed:false, userID:1});;
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:1, taskCategory:"Business", description:"Do Something", dateScheduledAsUTCString: new Date("11/24/2021").toISOString(),
      dateCompletedAsUTCString:null, taskID:7, dateCreatedAsUTCString: new Date("5/09/2021").toISOString(), completed:false, userID:1});;
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:2, taskCategory:"Personal", description:"Buy Milk", dateScheduledAsUTCString: new Date("2/11/2021").toISOString(),
      dateCompletedAsUTCString:null, taskID:8, dateCreatedAsUTCString: new Date("5/09/2021").toISOString(), completed:false, userID:1});;
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:2, taskCategory:"Personal", description:"Buy Eggs", dateScheduledAsUTCString: new Date("11/24/2021").toISOString(),
      dateCompletedAsUTCString:null, taskID:9, dateCreatedAsUTCString: new Date("5/09/2021").toISOString(), completed:false, userID:1});;
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:2, taskCategory:"Personal", description:"Clean Kitchen", dateScheduledAsUTCString: new Date("11/21/2021").toISOString(),
      dateCompletedAsUTCString:null, taskID:10, dateCreatedAsUTCString: new Date("5/09/2021").toISOString(), completed:false, userID:1});;
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:2, taskCategory:"Personal", description:"Do Laundry", dateScheduledAsUTCString: new Date("11/24/2021").toISOString(),
      dateCompletedAsUTCString:null, taskID:11, dateCreatedAsUTCString: new Date("5/09/2021").toISOString(), completed:true, userID:1});;
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:2, taskCategory:"Personal", description:"Wish Mom a Happy Birthday!", dateScheduledAsUTCString: new Date("11/22/2021").toISOString(),
      dateCompletedAsUTCString:null, taskID:12, dateCreatedAsUTCString: new Date("5/09/2021").toISOString(), completed:false, userID:1});;
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:1, taskCategory:"Business", description:"Followup with client on project",
      dateScheduledAsUTCString: new Date("11/22/2021").toISOString(),
      dateCompletedAsUTCString:null, taskID:13, dateCreatedAsUTCString: new Date("5/14/2021").toISOString(), completed:false, userID:1});;
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:2, taskCategory:"Personal", description:"Call Brother", dateScheduledAsUTCString: new Date("11/22/2021").toISOString(),
      dateCompletedAsUTCString:null, taskID:14, dateCreatedAsUTCString: new Date("5/27/2021").toISOString(), completed:false, userID:2});;
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:2, taskCategory:"Personal", description:"Call Sister", dateScheduledAsUTCString: new Date("11/22/2021").toISOString(),
      dateCompletedAsUTCString:null, taskID:15, dateCreatedAsUTCString: new Date("5/27/2021").toISOString(), completed:false, userID:2});;
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:1, taskCategory:"Business", description:"Start Chapter 6", dateScheduledAsUTCString: null,
      dateCompletedAsUTCString:null, taskID:16, dateCreatedAsUTCString: new Date("11/13/2021").toISOString(), completed:false, userID:1});;
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:null, taskCategory:"", description:"Update build scripts", dateScheduledAsUTCString: null,
      dateCompletedAsUTCString:null, taskID:17, dateCreatedAsUTCString: new Date("11/16/2021").toISOString(), completed:true, userID:1});;
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:1, taskCategory:"Business", description:"Update StackOverflow Profile", dateScheduledAsUTCString: null,
      dateCompletedAsUTCString:null, taskID:18, dateCreatedAsUTCString: new Date("11/16/2021").toISOString(), completed:false, userID:1});;
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:2, taskCategory:"Personal", description:"Sweep Floor", dateScheduledAsUTCString: null,
      dateCompletedAsUTCString:null, taskID:19, dateCreatedAsUTCString: new Date("11/16/2021").toISOString(), completed:false, userID:1});;
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:1, taskCategory:"Business", description:"Submit proposal to conference", dateScheduledAsUTCString: null,
      dateCompletedAsUTCString:null, taskID:20, dateCreatedAsUTCString: new Date("11/16/2021").toISOString(), completed:false, userID:1});;
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:2, taskCategory:"Personal", description:"Fold laundry", dateScheduledAsUTCString: null,
      dateCompletedAsUTCString:null, taskID:21, dateCreatedAsUTCString: new Date("11/16/2021").toISOString(), completed:false, userID:1});;
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:1, taskCategory:"Business", description:"Brainstorm new business opportunities", dateScheduledAsUTCString: null,
      dateCompletedAsUTCString:null, taskID:22, dateCreatedAsUTCString: new Date("12/05/2021").toISOString(), completed:false, userID:1});;
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:1, taskCategory:"Business", description:"Write Blog Post", dateScheduledAsUTCString: null,
      dateCompletedAsUTCString:null, taskID:23, dateCreatedAsUTCString: new Date("12/05/2021").toISOString(), completed:false, userID:1});;
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:1, taskCategory:"Business", description:"Plan new Blog Post", dateScheduledAsUTCString: null,
      dateCompletedAsUTCString:null, taskID:24, dateCreatedAsUTCString: new Date("12/05/2021").toISOString(), completed:false, userID:1});;
    this.tasks.push(task);
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:2, taskCategory:"Personal", description:"Schedule Hike", dateScheduledAsUTCString: null,
      dateCompletedAsUTCString:null, taskID:25, dateCreatedAsUTCString: new Date("12/05/2021").toISOString(), completed:false, userID:1});;
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:1, taskCategory:"Business", description:"Exercise", dateScheduledAsUTCString: null,
      dateCompletedAsUTCString:null, taskID:26, dateCreatedAsUTCString: new Date("12/05/2021").toISOString(), completed:true, userID:1});;
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:1, taskCategory:"Business", description:"Pay Bills", dateScheduledAsUTCString: null,
      dateCompletedAsUTCString:null, taskID:27, dateCreatedAsUTCString: new Date("12/05/2021").toISOString(), completed:false, userID:1});;
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:2, taskCategory:"Personal", description:"Trim Netflix Queue", dateScheduledAsUTCString: null,
      dateCompletedAsUTCString:null, taskID:28, dateCreatedAsUTCString: new Date("12/05/2021").toISOString(), completed:false, userID:1});;
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:1, taskCategory:"Business", description:"Invoice clients", dateScheduledAsUTCString: null,
      dateCompletedAsUTCString:null, taskID:29, dateCreatedAsUTCString: new Date("12/07/2021").toISOString(), completed:true, userID:0});;
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:null, taskCategory:"", description:"Research new tech", dateScheduledAsUTCString: null,
      dateCompletedAsUTCString:null, taskID:30, dateCreatedAsUTCString: new Date("12/12/2021").toISOString(), completed:true, userID:1});;
    this.tasks.push(task);
    task = Object.assign(new TaskVO(),{taskCategoryID:null, taskCategory:"", description:"Call back client", dateScheduledAsUTCString: null,
      dateCompletedAsUTCString:null, taskID:31, dateCreatedAsUTCString: new Date("2/11/2021").toISOString(), completed:false, userID:1});;
    this.tasks.push(task);
  };

}

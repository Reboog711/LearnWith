export class TaskVO {
  completed! : boolean;
  dateCompletedAsUTCString! : string;
  dateCreatedAsUTCString! : string;
  dateScheduledAsUTCString! : string | undefined;
  description! : string;
  taskCategory! : string;
  taskCategoryID! : number;
  taskID! : number;
  userID! : number;
};

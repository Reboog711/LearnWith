export class TaskVO {
  completed! : boolean;
  dateCompleted! : Date;
  dateCreated! : Date;
  dateScheduled! : Date | null;
  description! : string;
  taskCategory! : string;
  taskCategoryID! : number;
  taskID! : number;
  userID! : number;
};

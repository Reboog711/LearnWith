export class TaskFilterVO {
  completed! : boolean | null;
  endDate! : Date | null;
  scheduledEndDate! : Date | null;
  scheduledStartDate! : Date | null;
  startDate! : Date | null;
  taskCategoryID! : number;
  scheduledEqualDate! : Date;
};

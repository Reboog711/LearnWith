export class TaskFilterVO {
  completed! : boolean | null;
  endDateAsUTCString! : string | null;
  scheduledEndDateAsUTCString! : string | null;
  scheduledStartDateAsUTCString! : string | null;
  startDateAsUTCString! : string | null;
  taskCategoryID! : number;
};

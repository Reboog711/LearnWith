import {TaskModel} from "./task-model";
import {TaskVO} from "../vo/task-vo";

describe('Task Model', function () {
  let taskModel: TaskModel;

  beforeEach(() => {
    taskModel = new TaskModel();
  });

  // this is a shared function used by both sets onScheduleTaskRequest() and replaceTask() tests.
  function createTaskArray () : TaskVO[] {
    let tasks : TaskVO[] = [];
    let task : TaskVO;
    task = Object.assign(new TaskVO(), {taskID:24, description:'Test Task 1'});
    tasks.push(task);
    task = Object.assign(new TaskVO(), {taskID:25, description:'Test Task 2'});
    tasks.push(task);
    task = Object.assign(new TaskVO(), { taskID:26, description:'Test Task 3'});
    tasks.push(task);
    task = Object.assign(new TaskVO(), {taskID:27, description:'Test Task 4'});
    tasks.push(task);
    return tasks;
  }


  describe('onScheduleTaskRequest() ', function () {
    beforeEach(() => {
      taskModel.scheduledTasks = createTaskArray();
    });


    it('Should not add item to scheduledTasks and added tasks when Item Already in List', () => {
      let scheduledTasksLengthBefore : number = taskModel.scheduledTasks.length;
      let addedTasksLengthBefore : number = taskModel.scheduledTasks.length;
      let task : TaskVO = Object.assign(new TaskVO(), {taskID:27});
      taskModel.onScheduleTaskRequest(task);

      let scheduledTasksLengthAfter : Number = taskModel.scheduledTasks.length;
      let addedTasksLengthAfter : Number = taskModel.scheduledTasks.length;

      expect(scheduledTasksLengthAfter).toBe(scheduledTasksLengthBefore);
      expect(addedTasksLengthAfter).toBe(addedTasksLengthBefore);

    });

    it('Should add item to scheduledTasks and added tasks when Item Not in List', () => {
      let scheduledTasksLengthBefore : number = taskModel.scheduledTasks.length;
      let addedTasksLengthBefore : number = taskModel.scheduledTasks.length;
      let task : TaskVO = Object.assign(new TaskVO(), {taskID:270});
      taskModel.onScheduleTaskRequest(task);

      let scheduledTasksLengthAfter : number = taskModel.scheduledTasks.length;
      let addedTasksLengthAfter : number = taskModel.scheduledTasks.length;

      expect(scheduledTasksLengthAfter).toBe(scheduledTasksLengthBefore + 1);
      expect(addedTasksLengthAfter).toBe(addedTasksLengthBefore + 1);

    });

  });

  describe('replaceTask() ', function () {

    beforeEach(() => {
      taskModel.tasks = createTaskArray();
    });


    it('Should replace item if item exists in list', () => {
      let tasksLengthBefore : Number = taskModel.tasks.length;
      let taskBefore : TaskVO = taskModel.tasks[3];
      let task : TaskVO = Object.assign(new TaskVO(), {taskID:27, description:'Modified Description'});
      taskModel.replaceTask(task);
      let tasksLengthAfter : Number = taskModel.tasks.length;
      let taskAfter : TaskVO = taskModel.tasks[3];

      expect(tasksLengthBefore).toBe(tasksLengthAfter);
      expect(task.description).toBe(taskAfter.description);
      expect(task.description).not.toBe(taskBefore.description);
    });

    it('Should do nothing if changed item is not in the list', () => {
      let tasksLengthBefore : Number = taskModel.tasks.length;
      let taskBefore : TaskVO = taskModel.tasks[3];
      let task : TaskVO = Object.assign(new TaskVO(), {taskID:270, description:'Modified Description'});
      taskModel.replaceTask(task);
      let tasksLengthAfter : Number = taskModel.tasks.length;
      let taskAfter : TaskVO = taskModel.tasks[3];

      expect(tasksLengthBefore).toBe(tasksLengthAfter);
      expect(taskAfter.description).toBe(taskBefore.description);

    });
  });
});

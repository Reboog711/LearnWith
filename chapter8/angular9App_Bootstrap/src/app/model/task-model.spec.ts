import {TaskModel} from "./task-model";
import {TaskVO} from "../../../../A4/chapter8/Angular4TypeScript/src/com/dotComIt/learnWith/vo/TaskVO";

describe('Task Model', function () {
  let taskModel: TaskModel;

  beforeEach(() => {
    taskModel = new TaskModel();
  });

  // this is a shared function used by both sets onScheduleTaskRequest() and replaceTask() tests.
  function createTaskArray () : TaskVO[] {
    let tasks : TaskVO[] = [];
    let task : TaskVO;
    task = {taskID:24, description:'Test Task 1'} as TaskVO;
    tasks.push(task);
    task = {taskID:25, description:'Test Task 2'} as TaskVO;
    tasks.push(task);
    task = {taskID:26, description:'Test Task 3'} as TaskVO;
    tasks.push(task);
    task = {taskID:27, description:'Test Task 4'} as TaskVO;
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
      let task : TaskVO = {taskID:27} as TaskVO;
      taskModel.onScheduleTaskRequest(task);

      let scheduledTasksLengthAfter : Number = taskModel.scheduledTasks.length;
      let addedTasksLengthAfter : Number = taskModel.scheduledTasks.length;

      expect(scheduledTasksLengthAfter).toBe(scheduledTasksLengthBefore);
      expect(addedTasksLengthAfter).toBe(addedTasksLengthBefore);

    });

    it('Should add item to scheduledTasks and added tasks when Item Not in List', () => {
      let scheduledTasksLengthBefore : number = taskModel.scheduledTasks.length;
      let addedTasksLengthBefore : number = taskModel.scheduledTasks.length;
      let task : TaskVO = {taskID:270} as TaskVO;
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
      let task : TaskVO = {taskID:27, description:'Modified Description'} as TaskVO;
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
      let task : TaskVO = {taskID:270, description:'Modified Description'} as TaskVO;
      taskModel.replaceTask(task);
      let tasksLengthAfter : Number = taskModel.tasks.length;
      let taskAfter : TaskVO = taskModel.tasks[3];

      expect(tasksLengthBefore).toBe(tasksLengthAfter);
      expect(taskAfter.description).toBe(taskBefore.description);

    });
  });
});

import {TaskModel} from "./task-model";
import {TaskVO} from "../vo/task-vo";
import {createMockTaskArray, task4, task5} from "../mock/tasks-mock";

describe('Task Model', function () {
  let taskModel: TaskModel;

  beforeEach(() => {
    taskModel = new TaskModel();
  });

  describe('onScheduleTaskRequest() ', function () {
    beforeEach(() => {
      taskModel.scheduledTasks = createMockTaskArray();
    });


    it('Should not add item to scheduledTasks and added tasks when Item Already in List', () => {
      let scheduledTasksLengthBefore : number = taskModel.scheduledTasks.length;
      let addedTasksLengthBefore : number = taskModel.scheduledTasks.length;
      let task : TaskVO = Object.assign(new TaskVO(), task4);
      taskModel.onScheduleTaskRequest(task);

      let scheduledTasksLengthAfter : Number = taskModel.scheduledTasks.length;
      let addedTasksLengthAfter : Number = taskModel.scheduledTasks.length;

      expect(scheduledTasksLengthAfter).toBe(scheduledTasksLengthBefore);
      expect(addedTasksLengthAfter).toBe(addedTasksLengthBefore);
    });

    it('Should add item to scheduledTasks and added tasks when Item Not in List', () => {
      let scheduledTasksLengthBefore : number = taskModel.scheduledTasks.length;
      let addedTasksLengthBefore : number = taskModel.addedTasks.length;
      let task : TaskVO = Object.assign(new TaskVO(), task5);
      taskModel.onScheduleTaskRequest(task);

      let scheduledTasksLengthAfter : number = taskModel.scheduledTasks.length;
      let addedTasksLengthAfter : number = taskModel.addedTasks.length;

      expect(scheduledTasksLengthAfter).toBe(scheduledTasksLengthBefore + 1);
      expect(addedTasksLengthAfter).toBe(addedTasksLengthBefore + 1);

      expect(taskModel.scheduledTasks[taskModel.scheduledTasks.length-1]).toEqual(task);
      expect(taskModel.addedTasks[taskModel.addedTasks.length-1]).toEqual(task);

    });

  });

  describe('replaceTask() ', function () {

    beforeEach(() => {
      taskModel.tasks = createMockTaskArray();
    });


    it('Should replace item if item exists in list', () => {
      let tasksLengthBefore : Number = taskModel.tasks.length;
      let taskBefore : TaskVO = taskModel.tasks[3];
      let task : TaskVO = Object.assign(new TaskVO(), {taskID: taskModel.tasks[3].taskID, description:'Modified Description'});
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
      let task : TaskVO = Object.assign(new TaskVO(), task5);
      taskModel.replaceTask(task);
      let tasksLengthAfter : Number = taskModel.tasks.length;
      let taskAfter : TaskVO = taskModel.tasks[3];

      expect(tasksLengthBefore).toBe(tasksLengthAfter);
      expect(taskAfter.description).toBe(taskBefore.description);

    });
  });
});

import {TaskVO} from "../vo/task-vo";

export const task1: TaskVO = Object.assign(new TaskVO(), {taskID:24, description:'Test Task 1'});
export const task2: TaskVO = Object.assign(new TaskVO(), {taskID:25, description:'Test Task 2'});
export const task3: TaskVO = Object.assign(new TaskVO(), { taskID:26, description:'Test Task 3'});
export const task4: TaskVO = Object.assign(new TaskVO(), {taskID:27, description:'Test Task 4'});
export const task5: TaskVO = Object.assign(new TaskVO(), {taskID:270, description:'Test Task 5'});

export const createMockTaskArray = () => {
  let tasks : TaskVO[] = [];
  let task : TaskVO;
  task = Object.assign(new TaskVO(), task1);
  tasks.push(task);
  task = Object.assign(new TaskVO(), task2);
  tasks.push(task);
  task = Object.assign(new TaskVO(),task3 );
  tasks.push(task);
  task = Object.assign(new TaskVO(), task4);
  tasks.push(task);
  return tasks;
}

import {TaskModel} from "../../../../../src/com/dotComIt/learnWith/model/taskmodel";
import {TaskService} from "../../../../../src/com/dotComIt/learnWith/services/mock/task.service";
import {TaskVO} from "../../../../../src/com/dotComIt/learnWith/vo/TaskVO";

describe('Task Model', function () {

    let taskService : TaskService;
    let taskModel : TaskModel;

    beforeEach(() => {
        taskService = new TaskService();
        taskModel = new TaskModel(taskService);
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



        it('Item Already in List', () => {
            let scheduledTasksLengthBefore : Number = taskModel.scheduledTasks.length;
            let addedTasksLengthBefore : Number = taskModel.scheduledTasks.length;
            let task : TaskVO = {taskID:27} as TaskVO;
            taskModel.onScheduleTaskRequest(task);

            let scheduledTasksLengthAfter : Number = taskModel.scheduledTasks.length;
            let addedTasksLengthAfter : Number = taskModel.scheduledTasks.length;

            expect(scheduledTasksLengthAfter).toBe(scheduledTasksLengthBefore);
            expect(addedTasksLengthAfter).toBe(addedTasksLengthBefore);

        });

        it('Item Not in List', () => {
            let scheduledTasksLengthBefore : Number = taskModel.scheduledTasks.length + 1;
            let addedTasksLengthBefore : Number = taskModel.scheduledTasks.length + 1;
            let task : TaskVO = {taskID:270} as TaskVO;
            taskModel.onScheduleTaskRequest(task);

            let scheduledTasksLengthAfter : Number = taskModel.scheduledTasks.length;
            let addedTasksLengthAfter : Number = taskModel.scheduledTasks.length;

            expect(scheduledTasksLengthAfter).toBe(scheduledTasksLengthBefore);
            expect(addedTasksLengthAfter).toBe(addedTasksLengthBefore);

        });

    });

    describe('replaceTask() ', function () {
        beforeEach(() => {
            taskModel.tasks = createTaskArray();
        });

        it('Item in List is Changed', () => {
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

        it('Item Not in List, so nothing changed', () => {
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

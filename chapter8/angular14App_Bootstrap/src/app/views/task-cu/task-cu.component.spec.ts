import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCuComponent } from './task-cu.component';
import {TaskService} from "../../services/task.service";
import { Observable } from 'rxjs/internal/Observable';
import {TaskVO} from "../../vo/task-vo";
import {Observer} from "rxjs";
import {task5} from "../../mock/tasks-mock";
import {NgbActiveModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";
import {UserVO} from "../../vo/user-vo";
import {userMock} from "../../mock/user-mock";
import {UserModel} from "../../model/user-model";

describe('TaskCuComponent', () => {
  let component: TaskCuComponent;
  let fixture: ComponentFixture<TaskCuComponent>;
  let taskService : TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskCuComponent ],
      imports: [NgbModule, HttpClientTestingModule, FormsModule],
      providers: [NgbActiveModal]
    })
      .compileComponents();

  });

  beforeEach(() => {
    taskService = TestBed.inject(TaskService);
    fixture = TestBed.createComponent(TaskCuComponent);
    component = fixture.componentInstance;
    const userModel = TestBed.inject(UserModel);
    userModel.user = Object.assign(new UserVO(), userMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSave()', function() {


    it('Should update taskUpdateError when save fails', () => {
      const observable: Observable<TaskVO> = new Observable<TaskVO>((observer : Observer<TaskVO>) => {
        observer.error({});
        observer.complete();
      })

      spyOn(taskService, 'updateTask').and.returnValue(observable);

      component.onSave();
      expect(component.taskUpdateError).toBe('There was a problem saving the task.');

    });

    it('Should close Modal when save succeeds', function () {
      const result = Object.assign(new TaskVO(), task5);
      const observable: Observable<TaskVO> = new Observable<TaskVO>((observer : Observer<TaskVO>) => {
        observer.next(result);
        observer.complete();
      })
      spyOn(taskService, 'updateTask').and.returnValue(observable);
      spyOn(component.activeModal, 'close');
      component.onSave();
      expect(component.taskUpdateError).toBe('');
      expect(component.activeModal.close).toHaveBeenCalledWith(result);
    });


  });

});

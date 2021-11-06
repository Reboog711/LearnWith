import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {LocationStrategy} from "@angular/common";
import {MockLocationStrategy} from "@angular/common/testing";
import {FormsModule} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Observable, Observer} from "rxjs";
import { Router } from '@angular/router';
import {userMock} from "../../mock/user-mock";
import { UserModel } from 'src/app/model/user-model';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: UserService;
  let router: Router;
  let userModel: UserModel;

  beforeEach(async () => {
/*
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
*/
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule ],
      providers: [{ provide: LocationStrategy, useClass: MockLocationStrategy }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    userModel = TestBed.inject(UserModel);
    router =TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onReset()', () => {
    it('Values turned to empty strings', () => {
      component.username = 'username';
      component.password = 'password';
      component.onReset();
      expect(component.username).toBe('');
      expect(component.password).toBe('');
    });
  });

  describe('onLogin()', () => {
    let authenticateObserver: Observer<any>;
    beforeEach(() => {
      spyOn(userService, 'authenticate').and.returnValue(
        new Observable((observer : Observer<any>) => {
          authenticateObserver = observer;
        })
      );

    })
    it('No Username', () => {
      component.username = '';
      component.password = '';
      component.onLogin();
      expect(component.usernameError).toBe('You Must Enter a Username');
    });
    it('No Password', () => {
      component.username = '';
      component.password = '';
      component.onLogin();
      expect(component.passwordError).toBe('You Must Enter a Password');
    });
    it('Failure', () => {
      component.username = 'me';
      component.password = 'me';
      component.onLogin();
      const errorMessage = 'We could not log you in';
      authenticateObserver.error({
        error: {
          message: errorMessage
        }
      });
      expect(component.loginError).toBe(errorMessage);
    });

    it('Success', () => {
      component.username = 'me';
      component.password = 'me';
      spyOn(router,'navigate').and.returnValue(new Promise(() => true));

      component.onLogin();
      authenticateObserver.next(userMock);
      expect(component.loginError).toBe('');
      expect(userModel.user).toEqual(userMock);
      expect(router.navigate).toHaveBeenCalledWith(['/tasks']);
    });
  });


});

import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {UserModel} from "../model/user-model";

describe('AuthGuard', () => {
  let router: Router;
  let userModel: UserModel;
  let guard: AuthGuard;

  beforeEach(() => {
/*
    TestBed.configureTestingModule({});
*/
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    userModel = TestBed.inject(UserModel);
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should call route guard and let the user pass', () => {
    spyOn(userModel, 'validateUser').and.returnValue(true);
    const result = guard.canActivate(new ActivatedRouteSnapshot(), {} as RouterStateSnapshot);
    expect(result ).toBeTruthy();
  });

  it('should call route guard and redirect user not logged in', () => {
    spyOn(userModel, 'validateUser').and.returnValue(false);
    spyOn(router, 'navigate');
    const result = guard.canActivate(new ActivatedRouteSnapshot(), {}  as RouterStateSnapshot);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });


});

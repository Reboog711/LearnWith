import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {UserModel} from "../model/user-model";
import {RouterTestingModule} from "@angular/router/testing";

describe('AuthGuard', () => {
  let router: Router;
  let userModel: UserModel;
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    guard = TestBed.inject(AuthGuard);
    userModel = TestBed.inject(UserModel);
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
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

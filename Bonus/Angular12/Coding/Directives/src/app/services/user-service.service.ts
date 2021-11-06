import {EventEmitter, Injectable} from '@angular/core';

export const ADMIN = 1;
export const AUTHOR = 2;
export const DELETER = 3;
export const EDITOR = 4;

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private _activeUser: {userId: number, roles: number[]};
  get activeUser() {
    return this._activeUser;
  }
  set activeUser(value) {
    this._activeUser = value;
    this.userChange.emit(value);
  }

  userChange: EventEmitter<any> = new EventEmitter();

  constructor() { }
}

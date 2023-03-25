import { Component, OnInit } from '@angular/core';
import {ADMIN, AUTHOR, DELETER, EDITOR, UserServiceService} from '../services/user-service.service';

@Component({
  selector: 'app-create-structural-directive',
  templateUrl: './create-structural-directive.component.html',
  styleUrls: ['./create-structural-directive.component.css']
})
export class CreateStructuralDirectiveComponent implements OnInit {

  ADMIN = ADMIN;
  AUTHOR = AUTHOR;
  DELETER = DELETER;
  EDITOR = EDITOR;

  userProfiles = [
    {userId: 0, roles: [ADMIN]},
    {userId: 1, roles: [AUTHOR]},
    {userId: 2, roles: [DELETER]},
    {userId: 3, roles: [EDITOR]},
    {userId: 4, roles: [AUTHOR, EDITOR]},
    {userId: 5, roles: [AUTHOR, DELETER]},
    {userId: 6, roles: [DELETER, EDITOR]},
  ];

  constructor(private userService: UserServiceService) { }

  ngOnInit() {
  }

  selectUser(index) {
    this.userService.activeUser = this.userProfiles[index];
    console.log(index);
  }

}

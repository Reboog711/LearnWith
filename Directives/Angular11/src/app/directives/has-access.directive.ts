import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {UserServiceService} from '../services/user-service.service';

@Directive({
  selector: '[appHasAccess]'
})
export class HasAccessDirective {

  created = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserServiceService
  ) {
    this.userService.userChange.subscribe((value) => {
      this.onChange();
    });
  }

  private _allowedRoles: number[];
  @Input('appHasAccess')
  get allowedRoles() {
    return this._allowedRoles;
  }
  set allowedRoles(allowedRoles: number[]) {
    this._allowedRoles = allowedRoles;
    this.onChange();
  }

  private onChange() {
    let allowAccess = false;
    if (this.userService.activeUser) {
      allowAccess = this.userService.activeUser.roles.some((userRole) => {
        return this.allowedRoles.some((allowedRole) => {
          return allowedRole === userRole;
        });
      });
    }

    if (allowAccess ) {
      if (!this.created ) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.created = true;
      }
    } else {
      this.viewContainer.clear();
      this.created = false;
    }
  }

}

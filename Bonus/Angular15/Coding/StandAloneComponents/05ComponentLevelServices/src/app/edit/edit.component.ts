import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {SharedService} from "../shared.service";

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  constructor(public sharedService: SharedService) {
  }

  /*
    valueToEdit: string = '';

    @Output() valueToEditChanged: EventEmitter<string> = new EventEmitter<string>();

    onValueChange() {
      this.valueToEditChanged.emit(this.valueToEdit);
    }
  */
}

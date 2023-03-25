import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  valueToEdit: string = '';

  @Output() valueToEditChanged: EventEmitter<string> = new EventEmitter<string>();

  onValueChange() {
    debugger;
    this.valueToEditChanged.emit(this.valueToEdit);
  }
}

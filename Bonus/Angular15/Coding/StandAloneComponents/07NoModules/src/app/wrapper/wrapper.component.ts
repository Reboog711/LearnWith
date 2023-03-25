import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DisplayComponent} from "../display/display.component";
import {EditComponent} from "../edit/edit.component";
import { SharedService } from '../shared.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [CommonModule, DisplayComponent, EditComponent, RouterModule],
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css'],
  providers: [SharedService]
})
export class WrapperComponent {

}

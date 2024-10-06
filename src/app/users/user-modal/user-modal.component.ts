import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../user.model';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

@Component({
  standalone: true,
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
  imports: [CommonModule, FormsModule], 
})
export class UserModalComponent {
  @Input() user!: User; 
  @Output() userUpdated = new EventEmitter<User>(); 
  @Output() close = new EventEmitter<void>(); 

  updateUser() {
    this.userUpdated.emit(this.user); 
  }

  closeModal() {
    this.close.emit(); 
  }
}
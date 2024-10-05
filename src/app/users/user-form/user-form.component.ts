import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { FormsModule, NgForm } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule], // Ensure CommonModule is included
})
export class UserFormComponent {
  user: User = {
    first_name: '',
    email: '',
    phone: ''
  }; // Initialize user model

  @Output() userCreated = new EventEmitter<User>();

  constructor(private userService: UserService) {}

  onSubmit(userForm: NgForm) {
    if (userForm.valid) {
      this.userService.createUser(this.user).subscribe((newUser) => {
        this.userCreated.emit(newUser);
        userForm.resetForm(); // Reset the form after submission
        this.resetUser(); // Reset user model after creation
      });
    }
  }

  private resetUser() {
    this.user = { first_name: '', email: '', phone: '' }; // Reset user model to default values
  }
}
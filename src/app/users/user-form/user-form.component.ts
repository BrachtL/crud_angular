// src/app/users/user-form/user-form.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class UserFormComponent {
  user: User = {
    id: 0,  // ID should be auto-generated or provided later
    name: '',
    email: '',
    password_hash: '', // Initialize password_hash
    birthdate: new Date(),
    is_manager: false,
    creation_datetime: new Date().toISOString(),
  };

  @Output() userCreated = new EventEmitter<User>();

  constructor(private userService: UserService) {}

  onSubmit(userForm: NgForm) {
    if (userForm.valid) {
      this.userService.createUser(this.user).subscribe((newUser) => {
        this.userCreated.emit(newUser);
        userForm.resetForm();
        this.resetUser();
      });
    }
  }

  private resetUser() {
    this.user = {
      id: 0,  // ID will be set by the backend
      name: '',
      email: '',
      password_hash: '', // Reset password_hash to an empty string
      birthdate: new Date(),
      is_manager: false,
      creation_datetime: new Date().toISOString(),
    };
  }
}
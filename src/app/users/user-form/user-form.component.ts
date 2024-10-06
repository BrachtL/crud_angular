import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CloudinaryService } from '../../cloudinary.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class UserFormComponent {
  user: User = {
    id: 0,
    name: '',
    email: '',
    password_hash: '',
    birthdate: new Date(),
    is_manager: false,
    creation_datetime: new Date().toISOString(),
    profile_pic_url: ''
  };

  @Output() userCreated = new EventEmitter<User>();
  file: File | null = null; 
  errorMessage: string = ''; 

  // Define error messages for individual fields
  nameErrorMessage: string = 'Required';
  emailErrorMessage: string = 'Required';
  passwordErrorMessage: string = 'Required';
  birthdateErrorMessage: string = 'Required';

  constructor(private userService: UserService, private cloudinaryService: CloudinaryService) {}

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.file = input.files[0];
    }
  }

  async onSubmit(userForm: NgForm) {
    this.errorMessage = ''; 
    this.clearFieldErrors(); 

    if (this.validateFields()) {
      if (this.file) {
        try {
          const imageUrl = await this.cloudinaryService.uploadImage(this.file);
          this.user.profile_pic_url = imageUrl;
        } catch (error) {
          console.error('Image upload failed:', error);
          this.errorMessage = 'Image upload failed. Please try again.'; 
          return;
        }
      }

      this.userService.createUser(this.user).subscribe(
        (newUser) => {
          this.userCreated.emit(newUser);
          userForm.resetForm();
          this.resetUser();
        },
        (error) => {
          console.error('User creation failed:', error);
          this.errorMessage = 'User creation failed. Please try again.'; 
        }
      );
    }
  }
  clearFieldErrors() {
    this.nameErrorMessage = '';
    this.emailErrorMessage = '';
    this.passwordErrorMessage = '';
    this.birthdateErrorMessage = '';
  }

  private resetUser() {
    this.user = {
      id: 0,  // ID will be set by the backend
      name: '',
      email: '',
      password_hash: '', 
      birthdate: new Date(),
      is_manager: false,
      creation_datetime: new Date().toISOString(),
      profile_pic_url: '' 
    };
  }

  private validateFields(): boolean {
    const currentYear = new Date().getFullYear();
    const birthdateYear = new Date(this.user.birthdate).getFullYear();
    const birthdate = new Date(this.user.birthdate);
    const age = currentYear - birthdateYear; // Calculate age
    let isValid = true;

    // Check birthdate for minimum age of 13 years
    if (age < 13 || (age === 13 && new Date().getTime() < new Date(birthdateYear + 13, birthdate.getMonth(), birthdate.getDate()).getTime())) {
        this.birthdateErrorMessage = 'You must be at least 13 years old.';
        isValid = false;
    } else if (birthdateYear < 1900) {
        this.birthdateErrorMessage = 'Birthdate must be greater than 1900.';
        isValid = false;
    }

    // Check name
    const nameRegex = /^[A-Za-zÀ-ÿ\s]{4,}$/;  // Allows letters with accents, spaces, at least 4 characters
    if (!this.user.name || !nameRegex.test(this.user.name)) {
        this.nameErrorMessage = 'Name must be at least 4 characters long and contain no special characters.';
        isValid = false;
    }

    // Check password
    if (!this.user.password_hash || this.user.password_hash.length < 5) {
        this.passwordErrorMessage = 'Password must be at least 5 characters long.';
        isValid = false;
    }

    // Check email
    if (!this.user.email || !this.user.email.includes('@')) {
        this.emailErrorMessage = 'Email must contain an @ character.';
        isValid = false;
    }

    return isValid; 
  }
}

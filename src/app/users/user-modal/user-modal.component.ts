import { Component, EventEmitter, Output, Input } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CloudinaryService } from '../../cloudinary.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class UserModalComponent {
  @Input() user: User = {
    id: 0,
    name: '',
    email: '',
    birthdate: new Date(),
    is_manager: false,
    creation_datetime: new Date().toISOString(),
    profile_pic_url: ''
  };

  @Output() userUpdated = new EventEmitter<User>(); 
  @Output() closeModalEvent = new EventEmitter<void>(); 
  file: File | null = null;
  errorMessage: string = '';

  // Error messages for validation
  nameErrorMessage: string = 'Required';
  emailErrorMessage: string = 'Required';
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
          this.userUpdated.emit(newUser); 
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

  closeModal() {
    this.resetUser(); 
    this.closeModalEvent.emit(); 
  }

  resetUser() {
    this.user = {
      id: 0,
      name: '',
      email: '',
      birthdate: new Date(),
      is_manager: false,
      creation_datetime: new Date().toISOString(),
      profile_pic_url: ''
    };
    this.file = null; 
  }

  clearFieldErrors() {
    this.nameErrorMessage = '';
    this.emailErrorMessage = '';
    this.birthdateErrorMessage = '';
  }

  validateFields(): boolean {
    let valid = true;

    // Check Name
    const nameRegex = /^[A-Za-zÀ-ÿ\s]{4,}$/; // At least 4 characters long
    if (!this.user.name || !nameRegex.test(this.user.name)) {
      this.nameErrorMessage = 'Name must be at least 4 characters long and contain no special characters.';
      valid = false;
    }

    // Check Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    if (!this.user.email || !emailRegex.test(this.user.email)) {
      this.emailErrorMessage = 'Email must be a valid email address.';
      valid = false;
    }

    // Check Birthdate
    const currentYear = new Date().getFullYear();
    const birthdateYear = new Date(this.user.birthdate).getFullYear();
    if (!this.user.birthdate) {
      this.birthdateErrorMessage = 'Birthdate is required';
      valid = false;
    } else if (birthdateYear < 1900) {
      this.birthdateErrorMessage = 'Birthdate must be greater than 1900.';
      valid = false;
    } else {
      const age = currentYear - birthdateYear; // Calculate age
      if (age < 13 || (age === 13 && new Date().getTime() < new Date(birthdateYear + 13, new Date(this.user.birthdate).getMonth(), new Date(this.user.birthdate).getDate()).getTime())) {
        this.birthdateErrorMessage = 'You must be at least 13 years old.';
        valid = false;
      }
    }

    return valid;
  }
}
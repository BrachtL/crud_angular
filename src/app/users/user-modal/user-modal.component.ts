import { Component, EventEmitter, Output, Input } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CloudinaryService } from '../../cloudinary.service';
import { catchError, of, tap } from 'rxjs';

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
  tempUser: User; 
  errorMessage: string = '';

  // Error messages for validation
  nameErrorMessage: string = 'Required';
  emailErrorMessage: string = 'Required';
  birthdateErrorMessage: string = 'Required';

  constructor(private userService: UserService, private cloudinaryService: CloudinaryService) {
    this.tempUser = { ...this.user }; 
  }

  ngOnChanges() {
    this.tempUser = { ...this.user };
  }

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
          this.tempUser.profile_pic_url = imageUrl; // Update tempUser instead of user
        } catch (error) {
          console.error('Image upload failed:', error);
          this.errorMessage = 'Image upload failed. Please try again.';
          return;
        }
      }
  
      this.userService.createUser(this.tempUser).pipe(
        tap((newUser) => {
          this.userUpdated.emit(newUser); 
          userForm.resetForm();
          this.resetUser();
        }),
        catchError((error) => {
          console.error('User creation failed:', error);
          this.errorMessage = 'User creation failed. Please try again.';
          return of(null); // Return a fallback value
        })
      ).subscribe(); // Subscribing to trigger the observable
    }
  }

  closeModal() {
    this.resetUser(); 
    this.closeModalEvent.emit(); 
  }

  resetUser() {
    this.tempUser = { ...this.user }; 
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
    const nameRegex = /^[A-Za-zÀ-ÿ\s]{4,}$/; 
    if (!this.tempUser.name || !nameRegex.test(this.tempUser.name)) {
      this.nameErrorMessage = 'Name must be at least 4 characters long and contain no special characters.';
      valid = false;
    }

    // Check Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!this.tempUser.email || !emailRegex.test(this.tempUser.email)) {
      this.emailErrorMessage = 'Email must be a valid email address.';
      valid = false;
    }

    // Check Birthdate
    const currentYear = new Date().getFullYear();
    const birthdateYear = new Date(this.tempUser.birthdate).getFullYear();
    if (!this.tempUser.birthdate) {
      this.birthdateErrorMessage = 'Birthdate is required';
      valid = false;
    } else if (birthdateYear < 1900) {
      this.birthdateErrorMessage = 'Birthdate must be greater than 1900.';
      valid = false;
    } else {
      const age = currentYear - birthdateYear; 
      if (age < 13 || (age === 13 && new Date().getTime() < new Date(birthdateYear + 13, new Date(this.tempUser.birthdate).getMonth(), new Date(this.tempUser.birthdate).getDate()).getTime())) {
        this.birthdateErrorMessage = 'You must be at least 13 years old.';
        valid = false;
      }
    }

    return valid;
  }
}

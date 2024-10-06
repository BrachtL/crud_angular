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
  file: File | null = null; // Property to hold the selected file

  constructor(private userService: UserService, private cloudinaryService: CloudinaryService) {} // Inject CloudinaryService

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.file = input.files[0];
    }
  }

  async onSubmit(userForm: NgForm) {
    if (userForm.valid) {
      if (this.file) {
        
        try {
          const imageUrl = await this.cloudinaryService.uploadImage(this.file);
          this.user.profile_pic_url = imageUrl; 
        } catch (error) {
          console.error('Image upload failed:', error);
          return; 
        }
      }

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
      password_hash: '', 
      birthdate: new Date(),
      is_manager: false,
      creation_datetime: new Date().toISOString(),
      profile_pic_url: '' 
    };
  }
}
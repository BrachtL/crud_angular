import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  standalone: true, // Mark this component as standalone
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  imports: [FormsModule], // Add FormsModule to imports
})
export class UserFormComponent {
  user: User = { first_name: '', email: '', phone: '' };

  constructor(private userService: UserService) {}

  onSubmit(): void {
    if (this.user.id) {
      this.userService.updateUser(this.user.id, this.user).subscribe(() => {
        // Handle success (e.g., navigate or show a message)
      });
    } else {
      this.userService.createUser(this.user).subscribe(() => {
        // Handle success (e.g., navigate or show a message)
      });
    }
  }
}
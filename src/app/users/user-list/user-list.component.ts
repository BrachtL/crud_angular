import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  standalone: true, // Mark this component as standalone
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [CommonModule], // Add CommonModule to imports
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  deleteUser(userId?: number) {
    // Implement the logic to delete the user
    this.users = this.users.filter(user => user.id !== userId);
    // Optionally, add additional logic here, such as making an API call to delete the user from a server
  }
}
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { CommonModule } from '@angular/common'; 

@Component({
  standalone: true, 
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [CommonModule], 
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers(); 
  }

  loadUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  deleteUser(id?: number) {
    if (id) {
      this.userService.deleteUser(id).subscribe(() => {
        this.loadUsers(); 
      });
    }
  }
}
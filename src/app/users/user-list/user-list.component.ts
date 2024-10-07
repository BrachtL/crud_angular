import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { CommonModule } from '@angular/common'; 
import { UserFormComponent } from '../user-form/user-form.component'; 
import { UserModalComponent } from '../user-modal/user-modal.component'; 
import { catchError } from 'rxjs/operators'; 
import { of } from 'rxjs'; 

@Component({
  standalone: true, 
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [CommonModule, UserFormComponent, UserModalComponent],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null; 
  isModalOpen = false; 

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers(); 
  }

  loadUsers() {
    this.userService.getUsers().pipe(
      catchError((error) => {
        console.error('Error loading users:', error);
        return of([]); 
      })
    ).subscribe((users) => {
      this.users = users;
    });
  }

  deleteUser(id?: number, event?: MouseEvent) {
    if (event) {
      event.stopPropagation(); 
    }
    
    if (id) {
      this.userService.deleteUser(id).pipe(
        catchError((error) => {
          console.error('Error deleting user:', error);
          return of(null); 
        })
      ).subscribe(() => {
        this.loadUsers(); 
      });
    }
  }

  onUserClick(user: User) {
    this.selectedUser = user; 
    this.isModalOpen = true; 
    console.log('Selected User:', this.selectedUser); 
  }

  closeModal() {
    this.isModalOpen = false; 
    this.selectedUser = null; 
  }

  handleUserUpdated(updatedUser: User) {
    const index = this.users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser; 
    }
    this.closeModal(); 
  }
}

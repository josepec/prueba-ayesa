import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  filterType: string = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.filteredUsers = data;
    });
  }

  onFilterChange(): void {
    if (this.filterType) {
      this.filteredUsers = this.users.filter(
        (user) => user.tipo === this.filterType
      );
    } else {
      this.filteredUsers = [...this.users];
    }
  }

  deleteUser(user: any): void {
    if (confirm(`¿Está seguro de que desea borrar el usuario ${user.nombre}?`)) {
      this.users = this.users.filter((u) => u.id !== user.id);
      this.filteredUsers = [...this.users];
    }
  }

  viewUser(user: any): void {
    this.router.navigate(['/view', user.id]);
  }

  editUser(user: any): void {
    this.router.navigate(['/edit', user.id]);
  }

  createUser(): void {
    this.router.navigate(['/create-user']);
  }
}

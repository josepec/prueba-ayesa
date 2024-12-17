import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: any[] = [];
  private jsonUrl = 'assets/users.json';

  private usersSubject = new BehaviorSubject<any[]>(this.users);

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.http.get<any[]>(this.jsonUrl).subscribe((data) => {
      this.users = data;
      this.usersSubject.next([...this.users]);
    });
  }

  getUsers(): Observable<any[]> {
    return this.usersSubject.asObservable();
  }

  addUser(user: any): void {
    user.id = this.users.length + 1;
    this.users.push(user);
    this.usersSubject.next([...this.users]);
  }

  updateUser(updatedUser: any): void {
    const index = this.users.findIndex((u) => u.id === updatedUser.id);
    if (index > -1) {
      this.users[index] = updatedUser;
      this.usersSubject.next([...this.users]);
    }
  }

  deleteUser(id: number): void {
    this.users = this.users.filter((user) => user.id !== id);
    this.usersSubject.next([...this.users]);
  }

  getUserById(id: number): any {
    return this.users.find((user) => user.id === id);
  }
}

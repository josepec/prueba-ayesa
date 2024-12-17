import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  activeTab: string = 'personal';
  userData: any = {
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    tipo: 'demandante',
  };
  userId: number | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userId = +userId;
      this.loadUserData(this.userId);
    }
  }

  loadUserData(id: number): void {
    const user = this.userService.getUserById(id);
    if (user) {
      this.userData = { ...user };
    }
  }

  onSubmit(): void {
    if (this.isValid()) {
      if (this.userId) {
        this.userService.updateUser(this.userData);
      } else {
        this.userService.addUser(this.userData);
      }
      this.router.navigate(['/']);
    } else {
      alert('Por favor, rellena los campos obligatorios.');
    }
  }

  isValid(): boolean {
    return this.userData.nombre && this.userData.primerApellido;
  }
}
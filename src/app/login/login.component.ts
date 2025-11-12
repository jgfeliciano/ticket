import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, MatProgressSpinner],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) { }

  fazerLogin() {
    if (!this.email || !this.password) {
      alert('Preencher todos os campos');
      return;
    }

    this.isLoading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        console.log('Login bem-sucedido:', res);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Erro no Login:', err);
        alert('Usuário ou senha inválidos!');
      }
    });
  }
}

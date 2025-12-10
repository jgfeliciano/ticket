import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  mensagem: string | null = null;
  tipoMensagem: 'sucesso' | 'erro' | 'confirmacao' = 'sucesso'

  constructor(private authService: AuthService, private router: Router) { }

  logout(): void {
    this.mensagem = 'Tem certeza que deseja sair?';
    this.tipoMensagem = 'confirmacao';
  }

  confirmarLogout(): void {
    this.authService.logout();
    this.mostrarMensagem('Logout realizado com sucesso!', 'sucesso');
    setTimeout(() => this.router.navigate(['/login']), 1500);
  }

  cancelarLogout(): void {
    this.mostrarMensagem('Logout cancelado.', 'erro');
  }

  mostrarMensagem(texto: string, tipo: 'sucesso' | 'erro') {
    this.mensagem = texto;
    this.tipoMensagem = tipo;
    setTimeout(() => this.mensagem = null, 3000);
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../services/ticket.service';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket-edit',
  imports: [FormsModule, CommonModule],
  templateUrl: './ticket-edit.component.html',
  styleUrl: './ticket-edit.component.css'
})
export class TicketEditComponent {
  ticket: any = {};
  carregando = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.ticketService.listarTickets().subscribe({
        next: (tickets) => {
          this.ticket = tickets.find(t => t.id === +id);
          this.carregando = false;
        },
        error: () => {
          alert('Erro ao carregar o Ticket');
          this.router.navigate(['/ticket-list']);
        }
      });
    }
  }

  salvar(): void {
    if (!this.ticket?.id) return;

    this.ticketService.atualizarTicket(this.ticket.id, this.ticket).subscribe({
      next: () => {
        alert('Chamado atualizado com sucesso!');
        this.router.navigate(['/ticket-list']);
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao salvar as alterações');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/ticket-list']);
  }
}

import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TicketService } from '../ticket.service';
import { ɵɵRouterLink } from "@angular/router/testing";

@Component({
  selector: 'app-ticket-entulho',
  templateUrl: './ticket-entulho.component.html',
  styleUrl: './ticket-entulho.component.css',
  imports: [ReactiveFormsModule, ɵɵRouterLink],
  standalone: true
})
export class TicketEntulhoComponent {
  entulhoForm;

  constructor(private fb: FormBuilder, private ticketService: TicketService) {
    this.entulhoForm = this.fb.group({
      endereco: ['', Validators.required],
      localidade: ['', Validators.required],
      contribuinte: ['', Validators.required],
      telefone: ['', Validators.required],
      dataPedido: ['', Validators.required],
      status: ['Aberto', Validators.required],
      numeroOs: [''],
    });
  }

  onSubmit() {
    if (this.entulhoForm.valid) {
      this.ticketService.criarTicket('entulho', this.entulhoForm.value).subscribe({
        next: () => alert('Ticket de Entulho enviado com sucesso!'),
        error: (err) => alert('Erro ao enviar ticket: ' + err),
      });
    }
  }
}

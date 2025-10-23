import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TicketService } from '../ticket.service';
import { ɵɵRouterLink } from "@angular/router/testing";

@Component({
  selector: 'app-ticket-iluminacao',
  templateUrl: './ticket-iluminacao.component.html',
  styleUrl: './ticket-iluminacao.component.css',
  imports: [ReactiveFormsModule, ɵɵRouterLink],
  standalone: true
})
export class TicketIluminacaoComponent {
  iluminacaoForm;

  constructor(private fb: FormBuilder, private ticketService: TicketService) {
    this.iluminacaoForm = this.fb.group({
      logradouro: ['', Validators.required],
      localidade: ['', Validators.required],
      contribuinte: ['', Validators.required],
      telefone: ['', Validators.required],
      dataPedido: ['', Validators.required],
      status: ['Aberto', Validators.required],
      solicitacao: ['', Validators.required],
      numeroOs: [''],
    });
  }

  onSubmit() {
    if (this.iluminacaoForm.valid) {
      this.ticketService
        .criarTicket('iluminacao', this.iluminacaoForm.value)
        .subscribe({
          next: () => alert('Ticket de Iluminação enviado com sucesso!'),
          error: (err: any) => alert('Erro ao enviar ticket: ' + err),
        });
    }
  }
}

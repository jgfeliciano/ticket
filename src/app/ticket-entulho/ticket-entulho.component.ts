import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TicketService } from '../services/ticket.service';
import { RouterLink } from "@angular/router";
import { ViacepService } from '../services/viacep.service';
import { formatarDateToISO } from '../utils';

@Component({
  selector: 'app-ticket-entulho',
  templateUrl: './ticket-entulho.component.html',
  styleUrls: ['./ticket-entulho.component.css'],
  imports: [ReactiveFormsModule, RouterLink,],
  standalone: true
})
export class TicketEntulhoComponent {
  entulhoForm;

  constructor(private fb: FormBuilder, private ticketService: TicketService, private viacepService: ViacepService) {
    this.entulhoForm = this.fb.group({
      cep: ['', Validators.required],
      cidade: ['', Validators.required],
      bairro: ['', Validators.required],
      rua: ['', Validators.required],
      contribuinte: ['', Validators.required],
      telefone: ['', Validators.required],
      dataPedido: ['', Validators.required],
      numeroOs: ['', Validators.required]
    });
  }

  buscarCep() {
    const cep = this.entulhoForm.get('cep')?.value;
    if (cep && cep.length >= 8) {
      this.viacepService.buscarCep(cep).subscribe({
        next: (dados) => {
          if (!dados.erro) {
            this.entulhoForm.patchValue({
              rua: dados.logradouro,
              bairro: dados.bairro,
              cidade: dados.localidade,
            });
          } else {
            alert('CEP não encontrado!');
          }
        },
        error: (err) => {
          console.error('Erro ao buscar CEP:', err);
          alert('Erro ao buscar CEP.');
        }
      });
    }
  }

  formatarCep(event: any) {
    let valor = event.target.value.replace(/\D/g, '');
    if (valor.length > 5) {
      valor = valor.substring(0, 5) + '-' + valor.substring(5, 8);
    }
    event.target.value = valor;
    this.entulhoForm.get('cep')?.setValue(valor, { emitEvent: false });
  }

  formatarTelefone(event: any) {
    let valor = event.target.value.replace(/\D/g, '');
    if (valor.length > 2 && valor.length <= 6) {
      valor = valor.replace(/^(\d{2})(\d+)/, '($1) $2');
    } else if (valor.length > 6) {
      valor = valor.replace(/^(\d{2})(\d{5})(\d+)/, '($1) $2-$3');
    }
    event.target.value = valor;
    this.entulhoForm.get('telefone')?.setValue(valor, { emitEvent: false });
  }

  onSubmit() {
    if (this.entulhoForm.valid) {
      const dados = {
        cep: this.entulhoForm.value.cep,
        cidade: this.entulhoForm.value.cidade,
        bairro: this.entulhoForm.value.bairro,
        rua: this.entulhoForm.value.rua,
        contribuinte: this.entulhoForm.value.contribuinte,
        telefone: this.entulhoForm.value.telefone,
        dataDoPedido: this.entulhoForm.value.dataPedido ? formatarDateToISO(this.entulhoForm.value.dataPedido) : formatarDateToISO(new Date().toISOString()),
        statusDoPedido: 'Em aberto',
        os: this.entulhoForm.value.numeroOs
      };

      this.ticketService.criarTicket(dados).subscribe({
        next: () => alert('Ticket de Entulho criado com sucesso!'),
        error: (err) => alert('Erro ao criar ticket: ' + err.message)
      });
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }
}

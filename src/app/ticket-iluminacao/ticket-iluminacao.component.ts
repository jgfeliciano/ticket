import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TicketService } from '../services/ticket.service';
import { RouterLink } from "@angular/router";
import { ViacepService } from '../services/viacep.service';

@Component({
  selector: 'app-ticket-iluminacao',
  templateUrl: './ticket-iluminacao.component.html',
  styleUrls: ['./ticket-iluminacao.component.css'],
  imports: [ReactiveFormsModule, RouterLink],
  standalone: true
})
export class TicketIluminacaoComponent {
  iluminacaoForm;

  constructor(private fb: FormBuilder, private ticketService: TicketService, private viacepService: ViacepService) {
    this.iluminacaoForm = this.fb.group({
      cep: ['', Validators.required],
      cidade: ['', Validators.required],
      bairro: ['', Validators.required],
      rua: ['', Validators.required],
      contribuinte: ['', Validators.required],
      telefone: ['', Validators.required],
      dataPedido: ['', Validators.required],
      solicitacao: ['', Validators.required],
      numeroOs: [''],
    });
  }

  buscarCep() {
    const cep = this.iluminacaoForm.get('cep')?.value;
    if (cep && cep.length >= 8) {
      this.viacepService.buscarCep(cep).subscribe({
        next: (dados) => {
          if (!dados.erro) {
            this.iluminacaoForm.patchValue({
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
        },
      });
    }
  }

  formatarCep(event: any) {
    let valor = event.target.value.replace(/\D/g, '');
    if (valor.length > 5) {
      valor = valor.substring(0, 5) + '-' + valor.substring(5, 8);
    }
    event.target.value = valor;
    this.iluminacaoForm.get('cep')?.setValue(valor, { emitEvent: false });
  }

  formatarTelefone(event: any) {
    let valor = event.target.value.replace(/\D/g, '');
    if (valor.length > 2 && valor.length <= 6) {
      valor = valor.replace(/^(\d{2})(\d+)/, '($1) $2');
    } else if (valor.length > 6) {
      valor = valor.replace(/^(\d{2})(\d{5})(\d+)/, '($1) $2-$3');
    }
    event.target.value = valor;
    this.iluminacaoForm.get('telefone')?.setValue(valor, { emitEvent: false });
  }

  onSubmit() {
    if (this.iluminacaoForm.valid) {
      const dados = {
        cep: this.iluminacaoForm.value.cep,
        cidade: this.iluminacaoForm.value.cidade,
        bairro: this.iluminacaoForm.value.bairro,
        rua: this.iluminacaoForm.value.rua,
        contribuinte: this.iluminacaoForm.value.contribuinte,
        telefone: this.iluminacaoForm.value.telefone,
        dataDoPedido: this.iluminacaoForm.value.dataPedido ? new Date(this.iluminacaoForm.value.dataPedido).toISOString() : new Date().toISOString(),
        solicitacao: this.iluminacaoForm.value.solicitacao,
        statusDoPedido: 'Em aberto',
        os: this.iluminacaoForm.value.numeroOs
      };

      this.ticketService.criarTicket(dados).subscribe({
        next: () => alert('Ticket de Iluminação criado com sucesso!'),
        error: (err) => alert('Erro ao criar ticket:' + err.message)
      });
    } else {
      alert('Por favor, preencha todos os campos obrgatórios.');
    }
  }
}

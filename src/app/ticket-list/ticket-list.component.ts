import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TicketService } from '../services/ticket.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-ticket-list',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  filtro: string = '';
  tickets: any[] = [];
  ticketsFiltrados: any[] = [];
  ticketSelecionado: any = null;

  paginaAtual = 1;
  itensPorPagina = 6;

  mensagem: string | null = null;
  ticketParaExcluir: any = null;

  constructor(private ticketService: TicketService, private router: Router) { }

  ngOnInit() {
    this.carregarTickets();
  }

  carregarTickets() {
    this.ticketService.listarTickets().subscribe({
      next: (dados) => {
        this.tickets = dados;
        this.ticketsFiltrados = [...this.tickets];
      },
      error: (err) => console.error('Erro ao carregar tickets:', err),
    });
  }

  filtrarTickets() {
    const termo = this.filtro.toLowerCase();
    this.ticketsFiltrados = this.tickets.filter((ticket) => {
      return (
        ticket.os?.toString().toLowerCase().includes(termo) ||
        ticket.contribuinte?.toLowerCase().includes(termo) ||
        ticket.cidade?.toLowerCase().includes(termo) ||
        ticket.statusDoPedido?.toLowerCase().includes(termo) ||
        (ticket.dataDoPedido && new Date(ticket.dataDoPedido).toLocaleDateString('pt-BR').includes(termo))
      );
    });
    this.paginaAtual = 1;
  }

  get ticketsPaginados() {
    const start = (this.paginaAtual - 1) * this.itensPorPagina;
    return this.ticketsFiltrados.slice(start, start + this.itensPorPagina);
  }


  selecionarTicket(ticket: any) {
    this.ticketSelecionado = ticket;
  }

  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.ticketsFiltrados);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Tickets');
    XLSX.writeFile(workbook, 'tickets.xlsx');
  }

  exportToPDF(): void {
    const doc = new jsPDF();
    doc.text('Lista de Tickets', 14, 20);

    const columns = ['OS', 'Contribuinte', 'Cidade', 'Data', 'Status'];
    const rows = this.ticketsFiltrados.map(ticket => [
      ticket.os,
      ticket.contribuinte,
      ticket.cidade,
      new Date(ticket.dataDoPedido).toLocaleDateString('pt-BR'),
      ticket.statusDoPedido
    ]);

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 30,
      theme: 'grid'
    });

    const pdfBase64Only = doc.output('datauristring').split(',')[1];

    this.ticketService.enviarPDF(pdfBase64Only).subscribe({
      next: (res) => console.log('PDF enviado com sucesso!', res),
      error: (err) => console.log('Erro ao enviar PDF:', err)
    });

    doc.save('tickets.pdf');
  }

  editarTicket(ticket: any) {
    if (!ticket) return;
    this.router.navigate(['/editar', ticket.id]);
  }

  confirmarExclusao(ticket: any) {
    this.ticketParaExcluir = ticket;
  }

  excluirTicket() {
    if (!this.ticketParaExcluir) return;

    this.ticketService.excluirTicket(this.ticketParaExcluir.id).subscribe({
      next: () => {
        this.ticketParaExcluir = null;
        this.mostrarMensagem('Chamado excluído com sucesso!');
        this.carregarTickets();
      },
      error: (err) => console.error('Erro ao excluir chamado:', err),
    });
  }

  mostrarMensagem(texto: string) {
    this.mensagem = texto;
    setTimeout(() => this.mensagem = null, 3000);
  }
}

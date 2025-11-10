import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TicketService } from '../services/ticket.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { tick } from '@angular/core/testing';

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

  constructor(private ticketService: TicketService) { }

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
    this.ticketsFiltrados = this.tickets.filter(
      (t) =>
        t.contribuinte?.toLowerCase().includes(termo) ||
        t.cidade?.toLowerCase().includes(termo) ||
        t.status?.toLowerCase().includes(termo)
    );
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

    const columns = ['os', 'contribuinte', 'cidade', 'dataPedido', 'status'];
    const rows = this.ticketsFiltrados.map(ticket => [
      ticket.os,
      ticket.contribuinte,
      ticket.cidade,
      ticket.dataPedido,
      ticket.status
    ]);

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 30,
      theme: 'grid'
    })

    doc.save('tickets.pdf');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:3000/api'; // Ajuste a URL conforme necessário

  constructor(private http: HttpClient) { }

  criarTicket(tipo: string, dados: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tickets/${tipo}`, dados);
  }
}

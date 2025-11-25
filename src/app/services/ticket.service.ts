import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'https://ticketobras-1.onrender.com/api/v1/tickets';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  listarTickets(): Observable<any[]> {
    console.log(this.headers);
    return this.http.get<any[]>(this.apiUrl, { headers: this.headers, withCredentials: true });
  }

  criarTicket(dados: any): Observable<any> {
    return this.http.post(this.apiUrl, dados, { headers: this.headers, withCredentials: true });
  }

  atualizarTicket(id: number, dados: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, dados, {
      headers: this.headers,
      withCredentials: true
    });
  }

  enviarPDF(base64PDF: string) {
    const payload = {
      content: base64PDF
    };

    return this.http.post('https://ticketobras-1.onrender.com/api/v1/email', payload);
  }

  excluirTicket(id: any) {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.headers,
      withCredentials: true
    });
  }
}

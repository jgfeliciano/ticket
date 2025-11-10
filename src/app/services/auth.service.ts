import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://ticketobras-1.onrender.com/api/v1/login';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const body = { password, email };
    console.log(body);
    return this.http.post(this.apiUrl, body, { headers: this.headers, withCredentials: true });
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    console.log("Usuário deslogado");
  }
}

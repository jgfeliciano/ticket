import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {
  private baseUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) { }

  buscarCep(cep: string): Observable<any> {
    const cepLimpo = cep.replace(/\D/g, '');
    return this.http.get(`${this.baseUrl}/${cepLimpo}/json/`);
  }
}

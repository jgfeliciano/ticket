import { Routes } from '@angular/router';
import { TicketIluminacaoComponent } from './ticket-iluminacao/ticket-iluminacao.component';
import { TicketEntulhoComponent } from './ticket-entulho/ticket-entulho.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'ticket-iluminacao', component: TicketIluminacaoComponent },
  { path: 'ticket-entulho', component: TicketEntulhoComponent }
];

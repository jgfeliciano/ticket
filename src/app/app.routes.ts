import { Routes } from '@angular/router';
import { TicketIluminacaoComponent } from './ticket-iluminacao/ticket-iluminacao.component';
import { TicketEntulhoComponent } from './ticket-entulho/ticket-entulho.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'ticket-iluminacao', component: TicketIluminacaoComponent },
  { path: 'ticket-entulho', component: TicketEntulhoComponent },
  { path: 'ticket-list', component: TicketListComponent },
  { path: 'editar/:id', loadComponent: () => import('./ticket-edit/ticket-edit.component').then(m => m.TicketEditComponent) },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

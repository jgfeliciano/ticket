import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TicketIluminacaoComponent } from './ticket-iluminacao.component';

describe('TicketIluminacaoComponent', () => {
  let component: TicketIluminacaoComponent;
  let fixture: ComponentFixture<TicketIluminacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketIluminacaoComponent, HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TicketIluminacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

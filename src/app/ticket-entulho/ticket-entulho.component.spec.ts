import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TicketEntulhoComponent } from './ticket-entulho.component';

describe('TicketEntulhoComponent', () => {
  let component: TicketEntulhoComponent;
  let fixture: ComponentFixture<TicketEntulhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketEntulhoComponent, HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TicketEntulhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

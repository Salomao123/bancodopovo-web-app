import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosCanceladoComponent } from './eventos-realizado.component';

describe('EventosRealizadoComponent', () => {
  let component: EventosRealizadoComponent;
  let fixture: ComponentFixture<EventosRealizadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosRealizadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosRealizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

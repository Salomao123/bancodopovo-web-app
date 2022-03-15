import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosCanceladoComponent } from './eventos-cancelado.component';

describe('EventosCanceladoComponent', () => {
  let component: EventosCanceladoComponent;
  let fixture: ComponentFixture<EventosCanceladoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosCanceladoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosCanceladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

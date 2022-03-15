import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosParticipantesComponent } from './eventos-participantes.component';

describe('EventosParticipantesComponent', () => {
  let component: EventosParticipantesComponent;
  let fixture: ComponentFixture<EventosParticipantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosParticipantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosParticipantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

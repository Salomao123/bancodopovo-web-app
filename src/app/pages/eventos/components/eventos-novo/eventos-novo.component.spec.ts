import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosNovoComponent } from './eventos-novo.component';

describe('EventosNovoComponent', () => {
  let component: EventosNovoComponent;
  let fixture: ComponentFixture<EventosNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

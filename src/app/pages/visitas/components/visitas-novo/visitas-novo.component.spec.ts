import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitasNovoComponent } from './visitas-novo.component';

describe('VisitasNovoComponent', () => {
  let component: VisitasNovoComponent;
  let fixture: ComponentFixture<VisitasNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitasNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitasNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

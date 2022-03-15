import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitasStatusComponent } from './visitas-status.component';

describe('VisitasStatusComponent', () => {
  let component: PerfilStatusComponent;
  let fixture: ComponentFixture<VisitasStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitasStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitasStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

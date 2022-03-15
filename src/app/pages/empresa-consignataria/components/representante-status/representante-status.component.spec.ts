import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentanteStatusComponent } from './representante-status.component';

describe('RepresentanteStatusComponent', () => {
  let component: RepresentanteStatusComponent;
  let fixture: ComponentFixture<RepresentanteStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepresentanteStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentanteStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

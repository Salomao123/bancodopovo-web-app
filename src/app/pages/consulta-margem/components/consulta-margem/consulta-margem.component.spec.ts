import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaMargemComponent } from './consulta-margem.component';

describe('ConsultaMargemComponent', () => {
  let component: ConsultaMargemComponent;
  let fixture: ComponentFixture<ConsultaMargemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaMargemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaMargemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

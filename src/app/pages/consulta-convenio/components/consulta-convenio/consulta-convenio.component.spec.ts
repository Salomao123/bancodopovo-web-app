import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaConvenioComponent } from './consulta-convenio.component';

describe('ConsultaConvenioComponent', () => {
  let component: ConsultaConvenioComponent;
  let fixture: ComponentFixture<ConsultaConvenioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaConvenioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaConvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

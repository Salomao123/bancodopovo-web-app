import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuladorDetalheComponent } from './simulador-detalhe.component';

describe('SimuladorDetalheComponent', () => {
  let component: SimuladorDetalheComponent;
  let fixture: ComponentFixture<SimuladorDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimuladorDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimuladorDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

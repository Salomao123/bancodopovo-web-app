import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprestimoDetalheComponent } from './emprestimo-detalhe.component';

describe('EmprestimoDetalheComponent', () => {
  let component: EmprestimoDetalheComponent;
  let fixture: ComponentFixture<EmprestimoDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmprestimoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmprestimoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

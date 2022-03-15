import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaFinanceiroComponent } from './pessoa-financeiro.component';

describe('PessoaFinanceiroComponent', () => {
  let component: PessoaFinanceiroComponent;
  let fixture: ComponentFixture<PessoaFinanceiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoaFinanceiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaFinanceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

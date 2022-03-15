import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaDocumentoComponent } from './pessoa-documento.component';

describe('PessoaDocumentoComponent', () => {
  let component: PessoaDocumentoComponent;
  let fixture: ComponentFixture<PessoaDocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoaDocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

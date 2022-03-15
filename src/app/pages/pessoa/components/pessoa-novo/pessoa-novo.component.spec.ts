import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaNovoComponent } from './pessoa-novo.component';

describe('PessoaNovoComponent', () => {
  let component: PessoaNovoComponent;
  let fixture: ComponentFixture<PessoaNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoaNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

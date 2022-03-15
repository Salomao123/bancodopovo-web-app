import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratacaoComponent } from './contratacao.component';

describe('ContratacaoComponent', () => {
  let component: ContratacaoComponent;
  let fixture: ComponentFixture<ContratacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaStatusComponent } from './pessoa-status.component';

describe('PessoaStatusComponent', () => {
  let component: PessoaStatusComponent;
  let fixture: ComponentFixture<PessoaStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoaStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

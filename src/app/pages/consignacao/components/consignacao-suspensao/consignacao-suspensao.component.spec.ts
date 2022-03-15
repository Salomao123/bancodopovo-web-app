import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignacaoSuspensaoComponent } from './consignacao-suspensao.component';

describe('ConsignacaoSuspensaoComponent', () => {
  let component: ConsignacaoSuspensaoComponent;
  let fixture: ComponentFixture<ConsignacaoSuspensaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsignacaoSuspensaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsignacaoSuspensaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

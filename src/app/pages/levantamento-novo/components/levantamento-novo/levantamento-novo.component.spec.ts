import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevantamentoNovoComponent } from './levantamento-novo.component';

describe('LevantamentoNovoComponent', () => {
  let component: LevantamentoNovoComponent;
  let fixture: ComponentFixture<LevantamentoNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevantamentoNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevantamentoNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtratoParcelasComponent } from './extrato-parcelas.component';

describe('ExtratoParcelasComponent', () => {
  let component: ExtratoParcelasComponent;
  let fixture: ComponentFixture<ExtratoParcelasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtratoParcelasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtratoParcelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

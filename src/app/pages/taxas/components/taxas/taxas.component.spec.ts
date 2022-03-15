import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxasComponent } from './taxas.component';

describe('TaxasComponent', () => {
  let component: TaxasComponent;
  let fixture: ComponentFixture<TaxasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

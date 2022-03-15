import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteImpressaoComponent } from './teste-impressao.component';

describe('TesteImpressaoComponent', () => {
  let component: TesteImpressaoComponent;
  let fixture: ComponentFixture<TesteImpressaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesteImpressaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteImpressaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

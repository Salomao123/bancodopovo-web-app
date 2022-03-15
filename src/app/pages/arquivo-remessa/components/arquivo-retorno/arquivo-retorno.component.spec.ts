import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArquivoRetornoComponent } from './arquivo-retorno.component';

describe('ArquivoRetornoComponent', () => {
  let component: ArquivoRetornoComponent;
  let fixture: ComponentFixture<ArquivoRetornoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArquivoRetornoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArquivoRetornoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

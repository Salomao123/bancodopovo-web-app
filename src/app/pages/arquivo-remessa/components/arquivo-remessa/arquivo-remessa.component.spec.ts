import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArquivoRemessaComponent } from './arquivo-remessa.component';

describe('ArquivoRemessaComponent', () => {
  let component: ArquivoRemessaComponent;
  let fixture: ComponentFixture<ArquivoRemessaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArquivoRemessaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArquivoRemessaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

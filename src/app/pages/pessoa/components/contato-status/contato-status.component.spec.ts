import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatoStatusComponent } from './contato-status.component';

describe('ContatoStatusComponent', () => {
  let component: ContatoStatusComponent;
  let fixture: ComponentFixture<ContatoStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContatoStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContatoStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

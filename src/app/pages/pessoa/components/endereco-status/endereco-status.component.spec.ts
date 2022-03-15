import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecoStatusComponent } from './endereco-status.component';

describe('EnderecoStatusComponent', () => {
  let component: EnderecoStatusComponent;
  let fixture: ComponentFixture<EnderecoStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnderecoStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnderecoStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

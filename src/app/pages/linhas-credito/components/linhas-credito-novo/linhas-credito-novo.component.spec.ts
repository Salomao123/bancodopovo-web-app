import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinhasCreditoNovoComponent } from './linhas-credito-novo.component';

describe('LinhasCreditoNovoComponent', () => {
  let component: LinhasCreditoNovoComponent;
  let fixture: ComponentFixture<LinhasCreditoNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinhasCreditoNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinhasCreditoNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

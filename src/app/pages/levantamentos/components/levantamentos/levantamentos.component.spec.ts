import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevantamentosComponent } from './levantamentos.component';

describe('LevantamentosComponent', () => {
  let component: LevantamentosComponent;
  let fixture: ComponentFixture<LevantamentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevantamentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevantamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

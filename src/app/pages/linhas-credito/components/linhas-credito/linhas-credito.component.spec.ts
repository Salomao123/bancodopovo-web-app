import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinhasCreditoComponent } from './linhas-credito.component';

describe('LinhasCreditoComponent', () => {
  let component: LinhasCreditoComponent;
  let fixture: ComponentFixture<LinhasCreditoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinhasCreditoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinhasCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

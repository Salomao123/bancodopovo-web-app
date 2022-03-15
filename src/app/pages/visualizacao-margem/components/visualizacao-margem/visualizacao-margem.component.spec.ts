import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizacaoMargemComponent } from './visualizacao-margem.component';

describe('VisualizacaoMargemComponent', () => {
  let component: VisualizacaoMargemComponent;
  let fixture: ComponentFixture<VisualizacaoMargemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizacaoMargemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizacaoMargemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

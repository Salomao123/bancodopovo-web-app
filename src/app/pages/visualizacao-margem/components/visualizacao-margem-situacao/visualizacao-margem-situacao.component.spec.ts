import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizacaoMargemSituacaoComponent } from './visualizacao-margem-situacao.component';

describe('VisualizacaoMargemSituacaoComponent', () => {
  let component: VisualizacaoMargemSituacaoComponent;
  let fixture: ComponentFixture<VisualizacaoMargemSituacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizacaoMargemSituacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizacaoMargemSituacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilStatusComponent } from './perfil-status.component';

describe('PerfilStatusComponent', () => {
  let component: PerfilStatusComponent;
  let fixture: ComponentFixture<PerfilStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioStatusComponent } from './usuario-status.component';

describe('UsuarioStatusComponent', () => {
  let component: UsuarioStatusComponent;
  let fixture: ComponentFixture<UsuarioStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

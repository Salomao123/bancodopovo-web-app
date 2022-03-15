import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilNovoComponent } from './perfil-novo.component';

describe('PerfilNovoComponent', () => {
  let component: PerfilNovoComponent;
  let fixture: ComponentFixture<PerfilNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOrgaoComponent } from './login-orgao.component';

describe('LoginOrgaoComponent', () => {
  let component: LoginOrgaoComponent;
  let fixture: ComponentFixture<LoginOrgaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginOrgaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginOrgaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

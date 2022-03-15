import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDropComponent } from './user-drop.component';

describe('UserDropComponent', () => {
  let component: UserDropComponent;
  let fixture: ComponentFixture<UserDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

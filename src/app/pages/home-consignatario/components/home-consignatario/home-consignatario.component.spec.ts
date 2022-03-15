import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeConsignatarioComponent } from './home-consignatario.component';

describe('HomeConsignatarioComponent', () => {
  let component: HomeConsignatarioComponent;
  let fixture: ComponentFixture<HomeConsignatarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeConsignatarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeConsignatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

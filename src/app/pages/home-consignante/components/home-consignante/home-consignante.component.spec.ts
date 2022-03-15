import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeConsignanteComponent } from './home-consignante.component';

describe('HomeConsignanteComponent', () => {
  let component: HomeConsignanteComponent;
  let fixture: ComponentFixture<HomeConsignanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeConsignanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeConsignanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

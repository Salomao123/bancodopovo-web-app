import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeConsignadoComponent } from './home-consignado.component';

describe('HomeConsignadoComponent', () => {
  let component: HomeConsignadoComponent;
  let fixture: ComponentFixture<HomeConsignadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeConsignadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeConsignadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

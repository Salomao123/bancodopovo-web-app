import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConvenioStatusComponent } from './convenio-status.component';

describe('ConvenioStatusComponent', () => {
  let component: ConvenioStatusComponent;
  let fixture: ComponentFixture<ConvenioStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvenioStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvenioStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

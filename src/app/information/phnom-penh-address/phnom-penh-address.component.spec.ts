import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhnomPenhAddressComponent } from './phnom-penh-address.component';

describe('PhnomPenhAddressComponent', () => {
  let component: PhnomPenhAddressComponent;
  let fixture: ComponentFixture<PhnomPenhAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhnomPenhAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhnomPenhAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

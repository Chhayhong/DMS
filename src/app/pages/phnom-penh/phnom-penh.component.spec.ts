import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhnomPenhComponent } from './phnom-penh.component';

describe('PhnomPenhComponent', () => {
  let component: PhnomPenhComponent;
  let fixture: ComponentFixture<PhnomPenhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhnomPenhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhnomPenhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

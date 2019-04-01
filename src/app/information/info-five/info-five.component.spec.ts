import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoFiveComponent } from './info-five.component';

describe('InfoFiveComponent', () => {
  let component: InfoFiveComponent;
  let fixture: ComponentFixture<InfoFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

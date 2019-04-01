import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoThreeComponent } from './info-three.component';

describe('InfoThreeComponent', () => {
  let component: InfoThreeComponent;
  let fixture: ComponentFixture<InfoThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

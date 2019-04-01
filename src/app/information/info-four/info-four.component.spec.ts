import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoFourComponent } from './info-four.component';

describe('InfoFourComponent', () => {
  let component: InfoFourComponent;
  let fixture: ComponentFixture<InfoFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

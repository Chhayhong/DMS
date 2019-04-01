import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkNameComponent } from './monk-name.component';

describe('MonkNameComponent', () => {
  let component: MonkNameComponent;
  let fixture: ComponentFixture<MonkNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonkNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonkNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

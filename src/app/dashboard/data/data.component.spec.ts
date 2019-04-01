import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatIconModule, MatTreeModule } from '@angular/material';

import { DataComponent } from './data.component';

describe('DataComponent', () => {
  let component: DataComponent;
  let fixture: ComponentFixture<DataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataComponent ],
      imports: [
        MatButtonModule,
        MatIconModule,
        MatTreeModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'បញ្ជីព្រះសង្ឃថ្មីៗ', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'សន្ទនា', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'បញ្ជីព្រះសង្ឃថ្មីៗ', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'សន្ទនា', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}

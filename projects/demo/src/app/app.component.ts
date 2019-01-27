import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public endAfter = 20000;

  public start() {
    console.log(`Countdown ${this.endAfter / 1000}s has started`);
  }

  public finished() {
    console.log('Countdown has finished');
  }
}

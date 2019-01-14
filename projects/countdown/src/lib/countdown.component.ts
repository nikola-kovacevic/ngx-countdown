import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { interval, Subscription, Subject } from 'rxjs';

@Component({
  selector: 'ngx-countdown',
  template: `
    <p>
      {{ countdown.days }} : {{ countdown.hours }} : {{ countdown.minutes }} : {{ countdown.seconds }}
    </p>
  `,
  styles: []
})
export class CountdownComponent implements OnInit, OnDestroy {

  @Input() countTo: Date;
  timer = interval(1000);
  subscription: Subscription;

  countdown: any;

  constructor() { }

  ngOnInit() {
    this.startCounter();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  startCounter() {
    this.subscription = this.timer.subscribe(() => {
      const now = new Date().getTime();
      const distance = this.countTo.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.countdown = { days, hours, minutes, seconds };
    });
  }

}

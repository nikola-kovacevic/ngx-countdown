import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import {
  Subject,
  Observable,
  Subscription,
  timer
} from 'rxjs';

@Component({
  selector: 'ngx-countdown',
  template: `<div class="ngx-countdown">{{ countdown$ | async }}</div>`
})
export class CountdownComponent implements OnInit, OnDestroy {
  @Input() interval = 1000;
  @Input() padNumbers = true;
  @Input() endAfter: number;

  @Output() finished: EventEmitter < number > = new EventEmitter();
  @Output() start: EventEmitter < void > = new EventEmitter();

  private startTimer: Subscription;

  private countdown: Subject < string > = new Subject();
  public countdown$: Observable < string > = this.countdown.asObservable();

  constructor() {}

  ngOnInit(): void {
    this.initialize();
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private initialize(): void {
    this.startTimer = timer(0, this.interval).subscribe(() => {
      this.endAfter = this.endAfter - this.interval;
      this.countdown.next(this.calculate(this.endAfter, this.padNumbers));

      if (!this.endAfter) {
        this.cleanup();
        this.finished.emit(0);
      }
    });

    this.start.emit();
  }

  private cleanup(): void {
    if (this.startTimer && !this.startTimer.closed) {
      this.startTimer.unsubscribe();
    }
  }

  private calculate(time: number, pad: boolean): string {
    const counter = {
      days: Math.floor(time / (1000 * 60 * 60 * 24)),
      hours: Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((time % (1000 * 60)) / 1000)
    };

    if (pad) {
      Object.keys(counter).forEach(key => counter[key] = counter[key] < 10 ? `0${counter[key]}` : counter[key]);
    }

    return `${counter.days}:${counter.hours}:${counter.minutes}:${counter.seconds}`;
  }
}

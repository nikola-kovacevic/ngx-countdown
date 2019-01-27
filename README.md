# NGX Countdown Timer

NGX Countdown Timer is a simple Angular library that takes time (in ms) and counts down for that amount, notifying you once it started and finished.

## USAGE

You can see the example in demo folder of this repository!

How to use this library:

```sh
npm i @nkovacevic/ngx-countdown
```

```typescript
export class DemoComponent {
  public endAfter = 20000;

  public start() {
    console.log(`Countdown ${this.endAfter / 1000}s has started!`);
  }

  public finished() {
    console.log('Countdown has finished!');
  }
}
```

```html
<ngx-countdown [endAfter]="endAfter" (start)="start()" (finished)="finished()"></ngx-countdown>
```

## OPTIONS

```typescript
@Input() interval = 1000; // countdown interval in ms, defaults to 1 second
@Input() padNumbers = true; // prefix single digit numbers with leading 0
@Input() endAfter: number; // end after in ms

@Output() finished: EventEmitter < number >; // event emitter after countdown has reached zero
@Output() start: EventEmitter < void >; // event emitter when countdown has started
```

## LICENSE

MIT License [LICENSE][license]

## AUTHOR

Nikola Kovacevic

Created on January 2019

[//]: #
[license]: https://github.com/nikola-kovacevic/ngx-countdown/blob/master/LICENSE

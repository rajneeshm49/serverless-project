import { Component, ViewEncapsulation } from '@angular/core';
import { AppService } from './app.service';
import { tap } from 'rxjs';

@Component({
  selector: 'serverless-project-nx-welcome',
  template: `
    <div class="wrapper">
      <button (click)="onClick()">Click me</button>
      {{ name }}
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {
  name = '';
  constructor(private readonly appService: AppService) {}
  onClick() {
    this.appService
      .callName()
      .pipe(
        tap((name) => {
          this.name = name['message'];
        })
      )
      .subscribe();
  }
}

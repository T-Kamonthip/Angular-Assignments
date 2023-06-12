import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sample-web-app';
  id: number = 1;
  fontColor: string = 'red';

  message = 'Hello, World!';

  isShowWelcome: boolean = false;

  persons: any[] = [
    {
      id: 1,
      name: 'John Doe',
    },
    {
      id: 2,
      name: 'Jane Doe',
    },
    {
      id: 3,
      name: 'James Doe',
    },
    {
      id: 4,
      name: 'Daddy Doe',
    },
  ];

  sayMessage() {
    alert(this.message);
  }

  toggleWelcome() {
    if (this.isShowWelcome) {
      this.isShowWelcome = false;
    } else {
      this.isShowWelcome = true;
    }
  }
}

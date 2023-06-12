import { Component, OnInit } from '@angular/core';
import { CustomPoint } from './CustomPoint';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onLocate(locate: CustomPoint) {
    console.log('onLocate ', locate);
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomPoint } from '../CustomPoint';

@Component({
  selector: 'app-locator',
  templateUrl: './locator.component.html',
  styleUrls: ['./locator.component.scss'],
})
export class LocatorComponent implements OnInit {
  public _formTitle: String = 'Locator';
  @Input()
  set formTitle(_title: String) {
    this._formTitle = _title;
  }

  _location!: CustomPoint;
  get location() {
    return this._location;
  }

  set location(newLo: CustomPoint) {
    this._location = newLo;
  }

  @Output() locate = new EventEmitter<CustomPoint>();
  constructor() {}

  ngOnInit(): void {
    this._location = {
      latitude: null,
      longitude: null,
    };
    console.log('ngOnInit ', this._location);
  }

  submitLocate() {
    this.locate.emit(this._location);
  }
}

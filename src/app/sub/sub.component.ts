import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-sub',
  templateUrl: './sub.component.html',
  styleUrls: ['./sub.component.scss'],
})
export class SubComponent implements OnInit {
  personList: any[] = [];

  constructor(private router: Router, private personService: PersonService) {}

  ngOnInit(): void {
    this.personList = this.personService.getPersons();
  }

  toMain() {
    this.router.navigate(['/']);
  }
}

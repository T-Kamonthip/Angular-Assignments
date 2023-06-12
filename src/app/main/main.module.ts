import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';

import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { LocatorComponent } from './locator/locator.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { AssignmentThreeComponent } from './assignment-three/assignment-three.component';

import { MapService } from '../services/map.service';
import { AssignmentFourComponent } from './assignment-four/assignment-four.component';

@NgModule({
  declarations: [MainComponent, LocatorComponent, AssignmentThreeComponent, AssignmentFourComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ButtonModule,
    InputNumberModule,
  ],
  providers: [MapService],
  bootstrap: [MainComponent],
})
export class MainModule {}

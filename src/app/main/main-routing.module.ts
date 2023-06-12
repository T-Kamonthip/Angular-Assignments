import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';
import { AssignmentThreeComponent } from './assignment-three/assignment-three.component';
import { AssignmentFourComponent } from './assignment-four/assignment-four.component';

const routes: Routes = [
  {
    path: 'assignment-two',
    component: MainComponent,
  },
  {
    path: 'assignment-three',
    component: AssignmentThreeComponent
  },
  {
    path: 'assignment-four',
    component: AssignmentFourComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}

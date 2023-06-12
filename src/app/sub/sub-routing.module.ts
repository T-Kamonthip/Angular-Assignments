import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SubComponent } from './sub.component';
import { BgFourColorComponent } from './bg-four-color/bg-four-color.component';
import { ProfileComponent } from './profile/profile.component';
import { CommentComponent } from './comment/comment.component';

const routes: Routes = [
  {
    path: 'assignment-one',
    component: BgFourColorComponent,
  },
  {
    path: 'assignment-two',
    component: ProfileComponent
  },
  {
    path: 'assignment-three',
    component: CommentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubRoutingModule {}

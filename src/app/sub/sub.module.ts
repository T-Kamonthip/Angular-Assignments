import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubComponent } from './sub.component';
import { SubRoutingModule } from './sub-routing.module';

import { PersonService } from '../services/person.service';
import { BgFourColorComponent } from './bg-four-color/bg-four-color.component';
import { ProfileComponent } from './profile/profile.component';
import { CommentComponent } from './comment/comment.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SubComponent,
    BgFourColorComponent,
    ProfileComponent,
    CommentComponent,
  ],
  imports: [CommonModule, SubRoutingModule, FormsModule],
  providers: [PersonService],
  bootstrap: [SubComponent],
})
export class SubModule {}

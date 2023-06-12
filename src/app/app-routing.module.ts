import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'second-half',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'first-half',
    loadChildren: () => import('./sub/sub.module').then((m) => m.SubModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

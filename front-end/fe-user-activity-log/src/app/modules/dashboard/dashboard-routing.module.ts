import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from '../activity/components/activities/activities.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../user/user.module').then( m => m.UserModule)
  },
  {
    path: 'actividades/:id',
    component: ActivitiesComponent,
    loadChildren: () => import('../activity/activity.module').then( m => m.ActivityModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

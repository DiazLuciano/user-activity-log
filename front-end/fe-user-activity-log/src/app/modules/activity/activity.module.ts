import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivitiesComponent } from './components/activities/activities.component';
import { MaterialModule } from '../../shared/material/material.module';


@NgModule({
  declarations: [
    ActivitiesComponent
  ],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    MaterialModule
  ]
})
export class ActivityModule { }

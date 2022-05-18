import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
// import { AuthGuard } from '../services/auth.guard';

//Section 9, lecture 119

const childRoutes: Routes = [
  {
      path: '',
      component: DashboardComponent,
      children: dashboardRoutes,
      // canActivate: [ AuthGuard ]  
    },
];

@NgModule({
  declarations: [],
  imports: [ 
      RouterModule.forChild( childRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class DashboardRoutesModule { }

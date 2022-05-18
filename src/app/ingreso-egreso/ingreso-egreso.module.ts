import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { DetalleComponent } from './detalle/detalle.component';
import { OrdenIngresoPipe } from '../pipes/orden-ingreso.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';

//Section 9, lecture 118
@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticasComponent,
    DetalleComponent, 
    OrdenIngresoPipe 
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('ingresoEgresos', ingresoEgresoReducer), //Section 10, lecture 122 Store with lazyLoad
    ReactiveFormsModule,
    RouterModule,
    NgChartsModule, //Section 9, lecture 110
    SharedModule, //Section 9, lecture 118
    DashboardRoutesModule
    
  ],
  exports:[
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticasComponent,
    DetalleComponent, 
    OrdenIngresoPipe 
  ]
})
export class IngresoEgresoModule { }

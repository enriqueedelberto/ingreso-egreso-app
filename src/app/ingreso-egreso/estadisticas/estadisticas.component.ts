 import { Component, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  ingresos:  number = 0;
  egresos: number = 0;
  totalIngresos: number = 0;
  totalEgresos: number = 0;

   // Doughnut //Section 9, lecture 110
   public doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos' ];
   public doughnutChartData: ChartData<'doughnut'> = {
     labels: this.doughnutChartLabels,
     datasets: [
       { data: [] }, 
     ]
   };

   public doughnutChartType: ChartType = 'doughnut';

  constructor(private store: Store<AppState>,) { }

  ngOnInit(): void {
    this.store.select('ingresoEgresos')
    .subscribe(({items}) => this.generarEstadisticas( items));

  }

  generarEstadisticas(items: IngresoEgreso[]){
    this.totalIngresos = 0;
    this.totalEgresos = 0;
    this.egresos = 0;
    this.ingresos = 0;

     for (const item of items) {
       if(item.tipo === 'Ingreso'){
         this.totalIngresos += item.monto;
         this.ingresos++;
       }

       if(item.tipo === 'Egreso'){
        this.totalEgresos += item.monto;
        this.egresos++;
      }
     }


     this.doughnutChartData.datasets = [ {data: [this.totalIngresos, this.totalEgresos]}];
  }

}

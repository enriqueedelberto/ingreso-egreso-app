import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import { AppState } from '../../app.reducer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];
  ingresoSubs: Subscription | undefined;

  constructor(private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {

   this.ingresoSubs =  this.store.select('ingresoEgresos')
    .subscribe(({items}) => {
      console.log(items)
      this.ingresosEgresos = items;
    });
  }

  ngOnDestroy(): void {
    
    this.ingresoSubs?.unsubscribe();
  }

  delete(uid?: string){
      this.ingresoEgresoService.borrarIngresoEgreso(uid)
      .then( () => Swal.fire('Borrado', 'Item borrado', 'success'))
      .catch( err => Swal.fire('Error', err.message, 'error'));
  }

}

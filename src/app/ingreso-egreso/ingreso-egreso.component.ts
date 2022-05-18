import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import  * as ui from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
 //Section 9, class 97
  ingresoForm!: FormGroup;
  tipo: string = 'Ingreso';
  loading: boolean = false;
  uiSubscription: Subscription | undefined;//Section 9, class 100

  constructor( private fb: FormBuilder,
               private store: Store<AppState>,
               private ingresoEgresoService: IngresoEgresoService) { }


  ngOnInit(): void {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required]
    });

    this.uiSubscription = this.store.select('ui')
         .subscribe(ui => this.loading = ui.isLoading);//Section 9, class 100
  }

  ngOnDestroy(): void {
    this.uiSubscription?.unsubscribe();
  }


  save(){
    
    // setTimeout( ()=>{
    //   this.store.dispatch(ui.stopLoading()); //Section 9, class 100
    // }, 2000);
 

    if(this.ingresoForm.invalid) {
      return;
    }

    this.store.dispatch(ui.isLoading());

    const { descripcion, monto }= this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
    .then( () =>{
      this.store.dispatch(ui.stopLoading());
      this.ingresoForm.reset();
      Swal.fire('Row created', descripcion, 'success' );
    })
    .catch(err => {
      this.store.dispatch(ui.stopLoading());
      Swal.fire('Error', err.message, 'error' );
    });
  }

}

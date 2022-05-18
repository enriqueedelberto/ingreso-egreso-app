import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubscription: Subscription | undefined;
  ingresoSubscription: Subscription | undefined;
  constructor(private store: Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('user')
    .pipe(  //Rxjs
      filter( auth => auth.user != null)
    )
    .subscribe( ({user}) => {
       
     this.ingresoSubscription =  this.ingresoEgresoService.initIngresosEgresosListener(user?.uid)
      .subscribe( (ingresosEgresosFB: IngresoEgreso[]) =>{  
        this.store.dispatch(ingresoEgresoActions.setItems({items: ingresosEgresosFB}));
      });
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.ingresoSubscription?.unsubscribe();
  }

}

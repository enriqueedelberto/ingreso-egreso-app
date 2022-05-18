import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducers';
import  *as  ingresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';

//Section 8 class 87: Creation reducers and actions with snippets
export interface AppState {
   ui: ui.State,
   user: auth.State,
   ingresoEgresos: ingresoEgreso.State
}



export const appReducers: ActionReducerMap<AppState> = {
    ui: ui.uiReducer,
    user: auth.authReducer, //Section 8, class 91
    ingresoEgresos: ingresoEgreso.ingresoEgresoReducer
}
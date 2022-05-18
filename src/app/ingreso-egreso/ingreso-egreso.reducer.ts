import { createReducer, on } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { setItems, unSetItems } from './ingreso-egreso.actions';
//Section 9, class 101
export interface State {
    items: IngresoEgreso[];
}

export interface AppStateWithIngresosEgresos extends AppState {
    ingresoEgresos:  State
}

export const initialState: State = {
   items: []
}

const _ingresoEgresoReducer = createReducer(initialState, 
    on(setItems, (state, { items }) => ({ ...state,  items: [...items]})), 
    on(unSetItems, state => ({ ...state,  items: []})), 
);

export function ingresoEgresoReducer(state: any, action: any) {
    return _ingresoEgresoReducer(state, action);  
}
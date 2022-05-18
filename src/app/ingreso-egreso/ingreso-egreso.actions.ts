import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

//Section 9, class 101
export const unSetItems = createAction('[IngresoEgreso] UnSet items');

export const setItems = createAction(
    '[IngresoEgreso] Set items',
    props< {items: IngresoEgreso[] }>()
    );
 
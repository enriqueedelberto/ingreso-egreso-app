import { createAction, props } from '@ngrx/store';
import { Usuario } from '../models/user.model';

export const setUser = createAction( //Section 8, class 91
    '[Auth Component] setUser',
    props<{user: Usuario}>()
);


export const unSetUser = createAction( '[Auth Component] unSetUser'); //Section 8, class 91


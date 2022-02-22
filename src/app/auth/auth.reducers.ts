import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../models/user.model';
import  * as actions from './auth.actions';

export interface State {
    user?: Usuario; 
}

export const initialState: State = {
   user: undefined,
}

const _authReducer = createReducer(initialState,

    on(actions.setUser, (state, {user}) => ({ ...state, user: {...user}})),
    on(actions.unSetUser, state  => ({ ...state, user: undefined})),

);

export function authReducer(state:any, action: any) {
    return _authReducer(state, action);
}
import { Action, createReducer, on } from '@ngrx/store';

import { AuthStateInterface } from '../types/authState.interface';
import { loginAction, login_failureAction, login_succesAction, registerAction, register_failureAction, register_succesAction } from './actions';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null
}

const authReducer = createReducer(
  initialState,
  // register reducers
  on(registerAction, (state): AuthStateInterface => ({
    ...state,
    isSubmitting: true,
    validationErrors: null,
  })),
  on(register_succesAction, (state, action): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    isLoggedIn: true,
    currentUser: action.currentUser,
  })),
  on(register_failureAction, (state, action): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    validationErrors: action.errors
  })),
  // login reducers
  on(loginAction, (state): AuthStateInterface => ({
    ...state,
    isSubmitting: true,
    validationErrors: null,
  })),
  on(login_succesAction, (state, action): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    isLoggedIn: true,
    currentUser: action.currentUser,
  })),
  on(login_failureAction, (state, action): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    validationErrors: action.errors
  })),
)

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
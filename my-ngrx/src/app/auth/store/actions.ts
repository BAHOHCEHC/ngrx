import { BackEndErrorsInterface } from 'src/app/shared/types/backEndErrors.interface';

import { createAction, props } from '@ngrx/store';

import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { ActionTypes } from './actionTypes';

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{ request: RegisterRequestInterface }>()
);

export const register_succesAction = createAction(
  ActionTypes.REGISTER_SUCCES,
  props<{ currentUser: CurrentUserInterface }>()
);

export const register_failureAction = createAction(
  ActionTypes.REGISTER_FAILURE,
  props<{ errors: BackEndErrorsInterface }>()
);
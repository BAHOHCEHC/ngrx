import { PersistanceService } from './../../../shared/services/persistance.service';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { AuthService } from '../../services/auth.service';
import { register_failureAction, register_succesAction, registerAction } from '../actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class RegisterEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router

  ) { }

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(registerAction),
      switchMap(({ request }) => {
        return this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            // window.localStorage.setItem('accessToken', currentUser.token); //не очень хорошая практика
            this.persistanceService.set('accessToken', currentUser.token);

            return register_succesAction({ currentUser });
          })
        )
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        return of(register_failureAction({ errors: errorResponse.error.errors }));
      })
    );
  });

  redirectAfterSubmit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register_succesAction),
      tap(() => {
        this.router.navigateByUrl('/');
      })
    ), { dispatch: false }  //необходимо для отмены диспатча при использовании tap
  )

}

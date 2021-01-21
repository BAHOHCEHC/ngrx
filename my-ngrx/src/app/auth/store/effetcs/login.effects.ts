import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { PersistanceService } from '../../../shared/services/persistance.service';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { AuthService } from '../../services/auth.service';
import { login_failureAction, login_succesAction, loginAction } from '../actions';

@Injectable()
export class LoginEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router

  ) { }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginAction),
      switchMap(({ request }) => {
        return this.authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            // window.localStorage.setItem('accessToken', currentUser.token); //не очень хорошая практика
            this.persistanceService.set('accessToken', currentUser.token);

            return login_succesAction({ currentUser });
          })
        )
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        return of(login_failureAction({ errors: errorResponse.error.errors }));
      })
    );
  });

  redirectAfterSubmit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login_succesAction),
      tap(() => {
        this.router.navigateByUrl('/');
      })
    ), { dispatch: false }  //необходимо для отмены диспатча при использовании tap
  )

}

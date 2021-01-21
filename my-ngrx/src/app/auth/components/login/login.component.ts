import { Observable } from 'rxjs';
import { isSubmittingSelector, validationErrorsSelector } from 'src/app/auth/store/selectors';
import { LoginRequestInterface } from 'src/app/auth/types/loginRequest.interface';
import { BackEndErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';

import { loginAction } from '../../store/actions';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup
  isSubmitting$: Observable<boolean>
  backEndsErrors$: Observable<BackEndErrorsInterface | null>

  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backEndsErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit(): void {
    const request: LoginRequestInterface = {
      user: this.form.value
    }
    this.store.dispatch(loginAction({ request }))
  }
}
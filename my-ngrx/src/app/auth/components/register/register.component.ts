import { Observable } from 'rxjs';
import { BackEndErrorsInterface } from 'src/app/shared/types/backEndErrors.interface';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';

import { registerAction } from '../../store/actions';
import { isSubmittingSelector, validationErrorsSelector } from '../../store/selectors';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  isSubmitting$: Observable<boolean>
  backEndsErrors$: Observable<BackEndErrorsInterface | null>

  constructor(private fb: FormBuilder, private store: Store<any>) { }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit(): void {
    const request: RegisterRequestInterface = {
      user: this.form.value
    }
    this.store.dispatch(registerAction({request}))
  }

  private initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(
      select(isSubmittingSelector)
    );

    this.backEndsErrors$ = this.store.pipe(
      select(validationErrorsSelector)
    );
  }
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import {
  BackendErrorMessagesModule
} from '../shared/modules/mackEndMessages/backendErrorMessages/backendErrorMessages.module';
import { PersistanceService } from '../shared/services/persistance.service';
import { RegisterComponent } from './components';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { LoginEffect } from './store/effetcs/login.effects';
import { RegisterEffect } from './store/effetcs/register.effects';
import { reducers } from './store/reducers';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },

];

@NgModule({
  imports: [
    BackendErrorMessagesModule,
    CommonModule,
    EffectsModule.forFeature([RegisterEffect, LoginEffect]),
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth', reducers),
    ReactiveFormsModule
  ],
  declarations: [RegisterComponent, LoginComponent],
  providers: [AuthService, PersistanceService]
})
export class AuthModule { }

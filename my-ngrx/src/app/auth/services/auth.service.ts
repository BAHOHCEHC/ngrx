import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { AuthResponseInterface } from '../types/authResponse.interface';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { LoginRequestInterface } from '../types/loginRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.url + '/users';

    return this.http.post<AuthResponseInterface>(url, data).pipe(
      map(this.getUser)
    );
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.url + '/users/login';

    return this.http.post<AuthResponseInterface>(url, data).pipe(
      map(this.getUser)
    );
  }

  private getUser(res: AuthResponseInterface): CurrentUserInterface {
    return res.user;
  }

}

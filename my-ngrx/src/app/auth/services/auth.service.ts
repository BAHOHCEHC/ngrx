import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { AuthResponseInterface } from '../types/authResponse.interface';
import { RegisterRequestInterface } from '../types/registerRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.url + '/users';

    return this.http.post<AuthResponseInterface>(url, data).pipe(
      map((res: AuthResponseInterface) => res.user)
    );
  }

}

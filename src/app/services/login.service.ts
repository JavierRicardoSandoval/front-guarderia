import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User, UserResponse } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private user = new BehaviorSubject<UserResponse>({message:'', token:''});

  constructor(
    private http: HttpClient, 
    private router: Router
  ) { }

  get user$(): Observable<UserResponse> {
    return this.user.asObservable();
  }

  get userValue(): UserResponse {
    return this.user.getValue();
  }

  login(authData: User): Observable<any> {
    return this.http
      .post<UserResponse>(`${environment.API_URL}user/signIn`, authData)
      .pipe(
        map((user: UserResponse) => {
          this.saveLocalStorage(user);
          this.user.next(user);
          return user;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  private saveLocalStorage(user: UserResponse): void {
    const { message, token } = user;
    localStorage.setItem('userToken', JSON.stringify(token));
  }

  private handlerError(err: any): Observable<any> {
    let errorMessage = 'Ha ocurrido un error en la solicitud';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}

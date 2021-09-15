import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  API_URL = environment.API_URL;
  token: any = 'Bearer '; 

  constructor(
    private http: HttpClient,
  ) {
    let userToken = localStorage.getItem('userToken'); // Por resolver el guardado del token en el servicio se esta llevando unas comas al inicio y al final
    let oneComma = userToken?.replace('"','');
    let lastComma = oneComma?.replace('"','');
    this.token += lastComma;
  }

  searchOwners(nombre: string){
    let body = {
      name: nombre
    }
    let headers = new HttpHeaders({'Authorization': this.token});
    return this.http.post(this.API_URL+'owner/findByName',body, {headers:headers})
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';


export interface LoginResponse {
  status:string;
  message?:string,
  data?:string  
}

@Injectable({ providedIn: 'root' })

export class AuthService {
  private _http = inject(HttpClient);

  login(email: string, password: string,type:string) {
    return this._http.post('/api/login', {
      email: email,
      password: password,
      userType: type
    });
  }
}

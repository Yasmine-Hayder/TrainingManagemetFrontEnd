import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../admin/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiServerUrl = environment.hostUrl;
  constructor(private http:HttpClient) { }


  public login(user:User):Observable<any>{
    console.log(user);
    return this.http.post(`${this.apiServerUrl}/user/login`,user)

  }
}
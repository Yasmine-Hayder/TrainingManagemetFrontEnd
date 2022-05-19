import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Session } from './session';
import { environment } from 'src/environments/environment';
import { Formation } from './formation';

@Injectable({providedIn: 'root'})
export class SessionService {
  private apiServerUrl = environment.hostUrl;

  constructor(private http: HttpClient){}

  public getSessions(id:number): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.apiServerUrl}/session/all/${id}`);
  }

  public addSession(user: Session): Observable<Session> {
    return this.http.post<Session>(`${this.apiServerUrl}/session/add`, user);
  }

  public updateSession(user: Session): Observable<Session> {
    return this.http.put<Session>(`${this.apiServerUrl}/session/update`, user);
  }

  public deleteSession(userid: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/session/delete/${userid}`);
  }
}
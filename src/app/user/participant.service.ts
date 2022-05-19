  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { environment } from 'src/environments/environment';
  import { Participant } from './Participant';

  @Injectable({providedIn: 'root'})
  export class ParticipantService {
    private apiServerUrl = environment.hostUrl;

    constructor(private http: HttpClient){}

    public getParticipants(id:number): Observable<Participant[]> {
      return this.http.get<Participant[]>(`${this.apiServerUrl}/participant/all/${id}`);
    }

    public addParticipant(user: Participant): Observable<Participant> {
      return this.http.post<Participant>(`${this.apiServerUrl}/participant/add`, user);

    }

    public updateParticipant(user: Participant): Observable<Participant> {
      return this.http.put<Participant>(`${this.apiServerUrl}/participant/update`, user);
    }

    public deleteParticipant(userid: number): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/participant/delete/${userid}`);
    }
  }
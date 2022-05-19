import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Domaine } from './domaine';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class DomaineService {
  private apiServerUrl = environment.hostUrl;

  constructor(private http: HttpClient){}

  public getDomaines(): Observable<Domaine[]> {
    return this.http.get<Domaine[]>(`${this.apiServerUrl}/domaine/all`);
  }


}
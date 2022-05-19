import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formation } from './formation';
import { environment } from 'src/environments/environment';
import { Formateur } from './formateur';
import { Organisme } from './organisme';
import { Pays } from './Pays';
import { Profil } from './Profil';
import { Domaine } from './domaine';

@Injectable({providedIn: 'root'})
export class FormationService {
  private apiServerUrl = environment.hostUrl;

  constructor(private http: HttpClient){}

  public getFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.apiServerUrl}/formation/all`);
  }

  public getFormateurs(): Observable<Formateur[]> {
    return this.http.get<Formateur[]>(`${this.apiServerUrl}/formateur/all`);
  }

  public getOrganismes(): Observable<Organisme[]> {
    return this.http.get<Organisme[]>(`${this.apiServerUrl}/organisme/all`);
  }

  public getPays(): Observable<Pays[]> {
    return this.http.get<Pays[]>(`${this.apiServerUrl}/pays/all`);
  }
  
  public getProfiles(): Observable<Profil[]> {
    return this.http.get<Profil[]>(`${this.apiServerUrl}/profil/all`);
  }

  public addFormation(user: Formation): Observable<Formation> {
    return this.http.post<Formation>(`${this.apiServerUrl}/formation/add`, user);
  }
  public addDomaine(user: Domaine): Observable<Domaine> {
    return this.http.post<Domaine>(`${this.apiServerUrl}/domaine/add`, user);
  }
  public addFormateur(user: Formateur): Observable<Formateur> {
    return this.http.post<Formateur>(`${this.apiServerUrl}/formateur/add`, user);
  }
  public updateFormation(user: Formation): Observable<Formation> {
    return this.http.put<Formation>(`${this.apiServerUrl}/formation/update`, user);
  }
  public addOrganisme(user: Organisme): Observable<Organisme> {
    return this.http.post<Organisme>(`${this.apiServerUrl}/organisme/add`, user);
  }
  public deleteFormation(userid: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/formation/delete/${userid}`);
  }
}
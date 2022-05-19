import { Domaine } from "./domaine";

export class Formation{
    id:number;
    titre:string;
    annee: number;
    nb_session:number;
    duree:number;
    budget:number;
    domaine:Domaine;
}
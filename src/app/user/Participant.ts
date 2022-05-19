import { Pays } from "./Pays";
import { Profil } from "./Profil";
import { Session } from "./session";

export class Participant{
    id:number;
    email:string;
    nom:string;
    prenom:string;
    tel:string;
    pays:Pays;
    profil:Profil;
    sessions:Session[];
}
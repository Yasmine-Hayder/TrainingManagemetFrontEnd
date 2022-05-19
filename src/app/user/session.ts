import { MatDateFormats } from "@angular/material/core";
import { Formateur } from "./formateur";
import { Formation } from "./formation";
import { Organisme } from "./organisme";

export class Session{
    id:number;
    date_debut:Date;
    date_fin:Date;
    lieu:string;
    nb_participant:number;
    formateur:Formateur;
    formation:Formation;
    organisme:Organisme;
}
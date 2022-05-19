import { Organisme } from "./organisme";

export class Formateur {
    id:number;
    email:string;
    nom:string;
    prenom:string;
    tel:string;
    organisme_id:Organisme;
}
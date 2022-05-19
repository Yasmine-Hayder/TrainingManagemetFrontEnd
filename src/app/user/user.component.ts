import { Component, OnInit } from '@angular/core';
import { FormationService } from './formation.service';
import { DomaineService } from './domaine.service';
import { SessionService } from './session.service';
import { Formation } from './formation';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Session } from './session';
import { Domaine } from './domaine';
import { Formateur } from './formateur';
import { Organisme } from './organisme';
import { Participant } from './Participant';
import { ParticipantService } from './participant.service';
import { Pays } from './Pays';
import { Profil } from './Profil';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public formations : Formation[];
  public formateurs : Formateur[];
  public organismes : Organisme[];
  public formation : Formation;
  public current : Formation;
  public currentSession : Session;

  public s : Session;

  public sessions : Session[];
  public pays : Pays[];
  public profiles : Profil[];
  public participants : Participant[];
  public domaines : Domaine[];
  public deleteFormation:Formation;

  constructor (private formationService: FormationService, private domaineService: DomaineService,private sessionService: SessionService,private participantService: ParticipantService){}
  ngOnInit(): void {
    this.getFormations();
    this.getDomaines();
    this.getFormateurs();
    this.getOrganismes();
    this.getPays();
    this.getProfils();


  }
  
    public getFormations(): void{
      this.formationService.getFormations().subscribe(
        (response:Formation[]) => {
          this.formations= response;

        }
      )
    }
    public getParticipants(session : Session): void{
      const container=document.getElementById('main-container');
      const button= document.createElement('button');
      button.type='button';
      button.style.display='none';
      button.setAttribute('data-toggle','modal');
      button.setAttribute('data-target','#ParticipantSessionModal');
      container?.appendChild(button);
      button.click();
      this.participantService.getParticipants(session.id).subscribe(
        (response:Participant[]) => {
          this.s=session;
          console.log(response);
          this.participants= response;
        }
      )
    }
    public getOrganismes(): void{

      this.formationService.getOrganismes().subscribe(
        (response:Organisme[]) => {
          this.organismes= response;

        }
      )
    }
    public getPays(): void{

      this.formationService.getPays().subscribe(
        (response:Pays[]) => {
          this.pays= response;

        }
      )
    }
    public getProfils(): void{

      this.formationService.getProfiles().subscribe(
        (response:Profil[]) => {
          this.profiles= response;

        }
      )
    }
    public getFormateurs(): void{

      this.formationService.getFormateurs().subscribe(
        (response:Formateur[]) => {
          this.formateurs= response;

        }
      )
    }
    public getSessions(formation:Formation): void{
      const container=document.getElementById('main-container');
      const button= document.createElement('button');
      button.type='button';
      button.style.display='none';
      button.setAttribute('data-toggle','modal');
      button.setAttribute('data-target','#SessionFormationModal');
      container?.appendChild(button);
      button.click();
      this.sessionService.getSessions(formation.id).subscribe(
        (response:Session[]) => {
          this.sessions= response;
        }
      )
    }
    public getDomaines(): void{
      this.domaineService.getDomaines().subscribe(
        (response:Domaine[]) => {
          this.domaines= response;
        }
      )
    }

    public onAddFormation(addForm: NgForm): void {
      let f =new Formation();
      f.titre=addForm.value.titre,
      f.duree=addForm.value.duree,
      f.annee=addForm.value.annee,
      f.titre=addForm.value.titre,
      f.budget=addForm.value.budget,
      f.nb_session=addForm.value.nb_session
      var d=new Domaine()
      d.id=addForm.value.domaineId
      f.domaine=d;
      this.formationService.addFormation(f).subscribe(
        (response: Formation) => {
          console.log(response);
          document.getElementById('add-employee-form')!.click();
          this.getFormations();
          addForm.reset();
        },
        (error: HttpErrorResponse) => {
          alert("Erreur"); 
          addForm.reset();
        }
      );
    }
    public onAddDomaine(addForm3: NgForm): void {
      let d= new Domaine;
      d.libelle=addForm3.value.libelle
      document.getElementById('add-employee-form3')!.click();
      this.formationService.addDomaine(d).subscribe(
        (response: Domaine) => {
          this.getFormations();
          addForm3.reset();
        },
        (error: HttpErrorResponse) => {
          alert("Erreur"); 
          addForm3.reset();
        }
      );
    }
    public onAddOrganisme(addForm5: NgForm): void {
      document.getElementById('add-employee-form5')!.click();
      let d= new Organisme;
      d.libelle=addForm5.value.libelle
      this.formationService.addOrganisme(d).subscribe(
        (response: Organisme) => {
          this.getFormations();
          addForm5.reset();
        },
        (error: HttpErrorResponse) => {
          alert("Erreur"); 
          addForm5.reset();
        }
      );
    }
    public onAddFormateur(addForm4: NgForm): void {
      document.getElementById('add-employee-form4')!.click();
      let d= new Formateur;
      d.nom=addForm4.value.nom
      d.prenom=addForm4.value.prenom
      d.tel=addForm4.value.tel
      d.email=addForm4.value.email
      let o=new Organisme;
      o.libelle=addForm4.value.organismeId
      d.organisme_id=o
      document.getElementById('add-employee-form3')!.click();
      this.formationService.addFormateur(d).subscribe(
        (response: Formateur) => {
          this.getFormations();
          addForm4.reset();
        },
        (error: HttpErrorResponse) => {
          alert("Erreur"); 
          addForm4.reset();
        }
      );
    }
    public onAddSession(addForm1: NgForm,form:Formation): void {
      document.getElementById('add-employee-form1')!.click();
      let s =new Session();
      s.date_debut=addForm1.value.date_debut,
      s.date_fin=addForm1.value.date_fin,
      s.lieu=addForm1.value.lieu,
      s.nb_participant=addForm1.value.nb_participant
      let f= new Formation()
      f.id=addForm1.value.formationId,
      s.formation=form
      let f1=new Formateur()
      f1.id=addForm1.value.formateurId
      s.formateur=f1
      let o=new Organisme()
      o.id=addForm1.value.organismeId
      s.organisme=o
      console.log(s)
      this.sessionService.addSession(s).subscribe(
        (response: Session) => {
          console.log(response);
          this.getFormations();
          addForm1.reset();
        },
        (error: HttpErrorResponse) => {
          alert("Erreur de saisi"); 
          addForm1.reset();
        }
      );
    }

    public onAddParticipant(addForm2: NgForm,s:Session): void {
      document.getElementById('add-employee-form2')!.click();
      let participant=new Participant;
      participant.nom=addForm2.value.nom;
      participant.prenom=addForm2.value.prenom;
      participant.tel=addForm2.value.tel;
      participant.email=addForm2.value.email;
      let pa=new Pays;
      pa.id=addForm2.value.paysId
      participant.pays=pa;
      let pr=new Profil;
      pr.id=addForm2.value.profilId
      participant.profil=pr;
      console.log(s)
      var sess : Session[]=new Array();
      sess[0]=s
      
      participant.sessions=sess
      console.log(participant.sessions)
      this.participantService.addParticipant(participant).subscribe(
        (response: Participant) => {
          console.log(response);
          this.getParticipants(s);
          addForm2.reset();

        },
        (error: HttpErrorResponse) => {
          alert("Erreur de saisi"); 
          addForm2.reset();
        }
      );
    }
    public onDeleteFormation(userId: number): void {
      this.formationService.deleteFormation(userId).subscribe(
        (response: void) => {
          console.log(response);
          this.getFormations();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }

    public onOpenModal(formation:Formation,session:Session, mode:string): void{
      const container=document.getElementById('main-container');
      const button= document.createElement('button');
      button.type='button';
      button.style.display='none';
      button.setAttribute('data-toggle','modal');
      if (mode== 'add') {
        button.setAttribute('data-target','#addFormationModal');
      }
      if (mode== 'addDomaine') {
        button.setAttribute('data-target','#addDomaineModal');
      }
      if (mode== 'addOrganisme') {
        button.setAttribute('data-target','#addOrganismeModal');
      }
      if (mode== 'addFormateur') {
        button.setAttribute('data-target','#addFormateurModal');
      }
      if (mode== 'session') {
        button.setAttribute('data-target','#SessionFormationModal');
      }
      if (mode== 'delete') {
        this.deleteFormation = formation;
        button.setAttribute('data-target','#deleteFormationModal');
      }
      if (mode== 'addSession') {
        this.current=formation;
        button.setAttribute('data-target','#addSessionModal');
      }
      if (mode== 'addParticipant') {
        this.currentSession=session;
        button.setAttribute('data-target','#addParticipantModal');
      }
      container?.appendChild(button);
      button.click();
    }
    title = 'trainingApp';
}

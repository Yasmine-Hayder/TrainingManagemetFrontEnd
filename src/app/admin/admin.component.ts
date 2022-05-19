import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from './user';
import { UserService } from './user.service';
import { AuthenticationService } from '../login/authentication.service';
import { NotificationService } from './notification.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public errorMessage :string;
  public users : User[];
  public editUser: User;
  public deleteUser:User;
  constructor (private userService: UserService,private loginService:AuthenticationService,private notifier:NotificationService){}
  ngOnInit(): void {
    this.getUser();
  }
  
    public getUser(): void{
      this.userService.getUsers().subscribe(
        (response:User[]) => {
          this.users= response;
        }
      )
    }

    public onAddUser(addForm: NgForm): void {
      document.getElementById('add-employee-form')!.click();
      this.userService.addUser(addForm.value).subscribe(
        (response: User) => {
          console.log(response);
          this.getUser();
          addForm.reset();
        },
        (error: HttpErrorResponse) => {
          alert("Utilisateur déja existant"); 
          addForm.reset();
        }
      );
    }
  
    public onUpdateUser(user: User): void {
      this.userService.updateUser(user).subscribe(
        (response: User) => {
          console.log(response);
          this.getUser();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  
    public onDeleteUser(userId: number): void {
      this.userService.deleteUser(userId).subscribe(
        (response: void) => {
          console.log(response);
          this.getUser();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  
    public onOpenModal(user:User, mode:string): void{
      const container=document.getElementById('main-container');
      const button= document.createElement('button');
      button.type='button';
      button.style.display='none';
      button.setAttribute('data-toggle','modal');
      if (mode== 'add') {
        button.setAttribute('data-target','#addUserModal');
      }
      if (mode== 'edit') {
        this.editUser = user;
        button.setAttribute('data-target','#updateUserModal');
      }
      if (mode== 'delete') {
        this.deleteUser = user;
        button.setAttribute('data-target','#deleteUserModal');
      }
      container?.appendChild(button);
      button.click();
    }
    title = 'trainingApp';
  }




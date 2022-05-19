import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../login/authentication.service';
import { User } from '../admin/user';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public errorMessage :string;
  user:User=new User();
  public u:User;
  constructor(private router: Router,
    private loginservice: AuthenticationService) { }

  ngOnInit() {
  }

  checkLogin() {
    console.log(this.user)
    this.loginservice.login(this.user).subscribe(
      (response: User) => {
        console.log(response);
        if (response.role=='Admin'){
          this.router.navigate(['/admin']);
        }
        if (response.role=='User'){
          this.router.navigate(['/user']);
        }
  },(error: HttpErrorResponse) => {
    this.errorMessage="Login ou Password incorrecte"; 
  }

    );
}
}
import { SessionService } from '../services/session/session.service';
import { NgForm } from '@angular/forms/src/directives';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  errorMsg = '';
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private AuthService: AuthService, private Router: Router, private SessionService: SessionService) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    const data = {
      email: f.value.email,
      password: f.value.password,
    };
    this.AuthService.userLogin(data)
      .subscribe(
      (response) => {
        this.SessionService.statusUpdate.emit(true);
        console.log(response);
        f.reset();
        this.SessionService.setUserTokenToStorage(response.token);
        this.Router.navigate(['dashboard']);
      },
      (error) => {
        console.log(error);
        this.errorMsg = '<div class="alert alert-danger">' + error.error + '</div>';
      }
      );
  }

}

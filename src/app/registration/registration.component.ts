import { Router } from '@angular/router';
import { SessionService } from '../services/session/session.service';
import { AuthService } from '../services/auth/auth.service';
import { NgForm } from '@angular/forms/src/directives';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationComponent implements OnInit {
  errorMsg = '';
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private AuthService: AuthService, private SessionService: SessionService, private Router: Router) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    console.log(f.value.password + ' ' + f.value.ConfirmPassword);
    if (f.value.password !== f.value.confirmPassword) {
      this.errorMsg = '<div class="alert alert-danger">Password did not match</div>';
    }else {
      const data = {
        name: f.value.name,
        email: f.value.email,
        phone: f.value.mobileNumber,
        password: f.value.password
      };
      this.AuthService.setValues(data)
          .userRegistration()
          .subscribe(
            (response) => {
              if ( response.success === false) {
                this.errorMsg = '<div class="alert alert-danger">' + response.error + '</div>';
              }else {
                this.SessionService.setUserTokenToStorage(response.token);
                this.SessionService.statusUpdate.emit(true);
                f.reset();
                this.Router.navigate(['dashboard']);
              }
            },
            (error) => console.log(error)
          );
    }
  }
}

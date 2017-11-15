import { Router } from '@angular/router';
import { SessionService } from '../services/session/session.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
    isUserLoggedIn = false;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private SessionService: SessionService, private Router: Router) {
        this.SessionService.statusUpdate.subscribe(
          (status: boolean) => {
            this.isUserLoggedIn = status;
          }
       );
   }

  ngOnInit() {
       const _token =  this.SessionService.getUserTokenFromStorage();
       if (_token) {
          this.isUserLoggedIn = true;
       }else {
          this.isUserLoggedIn = false;
       }
  }


  logout() {
    this.isUserLoggedIn = false;
    this.SessionService.removeTokenFromStorage();
    this.Router.navigate(['login']);
  }

}

import { SessionService } from '../services/session/session.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private SessionService: SessionService, private Router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const _token = this.SessionService.getUserTokenFromStorage();
    if (_token) {
      return true;
    }else {
        this.Router.navigate(['login']);
    }
  }
}

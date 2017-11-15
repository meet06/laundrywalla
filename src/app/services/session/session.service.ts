import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class SessionService {
  _token = '';
  statusUpdate = new EventEmitter <boolean>();

  userdata: {
    name: string,
    phone: string,
    email: string
  };
  constructor() { }

  setUserTokenToStorage(_token: string) {
    localStorage.setItem('_token', _token);
    this._token = _token;
  }

  getUserTokenFromStorage() {
    if (this._token) {
        return this._token;
    }else {
      const token = localStorage.getItem('_token');
      if (token) {
        this._token = token;
        return this._token;
      }else {
        return false;
      }
    }
  }

  removeTokenFromStorage() {
    this._token = '';
    localStorage.removeItem('_token');
  }
}

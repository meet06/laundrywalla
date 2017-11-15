import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';



@Injectable()
export class AuthService {
  url = 'http://technouniverse.in/laundrywalla/dryz/public/api/';
  name: string;
  email: string;
  phone: string;
  password: string;

  constructor(private http: Http) { }

  // set value of all require for this service
  setValues(data: {name: string , email: string , phone: string , password: string}) {
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.password = data.password;
    return this;
  }

  // this is for registration of a user
  userRegistration() {
    const data = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      password: this.password
    };
    return this.http.post(this.url + 'registration', data)
    .map(
        (response: Response) => {
            console.log(response.json());
            return response.json();
        }
    );
  }


  userLogin(data: {email: string , password: string}) {
    return this.http.post(this.url + 'authenticate', data)
    .map(
        (response: Response) => {
            console.log(response.json());
            return response.json();
        },
    )
    .catch(
        (error: Response) => {
            return Observable.throw(error.json());
        }
    );
  }

}

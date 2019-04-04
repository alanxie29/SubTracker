import { Injectable } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user';
 
const TOKEN_KEY = 'access_token';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  url = environment.url;
  user = null;
  authenticationState = new BehaviorSubject(false);
  userObj = null;
  userData = null;

  constructor(
    private http: HttpClient,
    private helper: JwtHelperService,
    private storage: Storage,
    private plt: Platform,
    private alertController: AlertController,
    ) 
    {
      this.plt.ready().then(() => {
        this.checkToken();
      });
     }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);

        if (!isExpired) {
          this.user = decoded;
          this.authenticationState.next(true);
        } else {
          this.storage.remove(TOKEN_KEY);
        }
      }
    })
  }

  register(credentials) {
    return this.http.post(`${this.url}/api/register`, credentials).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }

  login(credentials) { console.log(credentials)
    return this.http.post(`${this.url}/api/login`, credentials)
    .pipe(
      tap(res => {
        this.storage.set(TOKEN_KEY, res['token']);
        this.user = this.helper.decodeToken(res['token']);
        this.authenticationState.next(true);
        this.userObj = res;
      }),
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  };

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  };

  getUserData() {
    return this.http.get(`${this.url}/api/user/${this.userObj.user}`) //5ca3797ee9c96e3d7c954be7
      .subscribe((data: User) => this.userData = {
        id: data['id'],
        email: data['email'],
        firstName: data['firstName'],
        lastName: data['lastName'],
        }),
        catchError(e => {
          this.showAlert(e.error.msg);
          throw new Error(e);
        });
  };

  isAuthenticated() {
    return this.authenticationState.value;
  }

  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }
}

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { tap, catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { AlertController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})


export class SubscriptionService {
  url = environment.url;
  userId: string = '';
  jwt: string = ''


  constructor(
    private http: HttpClient,
    private storage: Storage,
    private alertController: AlertController
  ) 
  {
    this.getToken();
  }

  getUserId() {
    this.storage.get('userData').then(val => {
      this.userId = val.user._id;
    });
  };

  getToken() {
    this.storage.get('access_token').then((token) => {
      this.jwt = token;
    })
  }

  createSubscription(data) {
    let httpOptions = {
      headers: new HttpHeaders({
        'access-token': this.jwt
        })
      };
    this.http.put(`${this.url}/api/create/${this.userId}`, data, httpOptions)
      .pipe(
        tap(res => {
          this.storage.set("userData", res);
        }),
        catchError(e => {
          this.showAlert(e.error.msg);
          throw new Error(e);
        })
      )
      .subscribe();
  }

  deleteSubscription(_id) {
    let httpOptions = {
      headers: new HttpHeaders({
        'access-token': this.jwt
        })
      };
    this.http.delete(`${this.url}/api/delete/${this.userId}/${_id}`, httpOptions)
      .pipe(
        tap(res => {
          this.storage.set("userData", res);
        }),
        catchError(e => {
          this.showAlert(e.error.msg);
          throw new Error(e);
        })
      ).subscribe();
  }

  updateSubscription(data, _id) {
    let httpOptions = {
      headers: new HttpHeaders({
        'access-token': this.jwt
        })
      };
    console.log(data)
    this.http.put(`${this.url}/api/update/${this.userId}/${_id}`, data, httpOptions)
    .pipe(
      tap(res => {
        this.storage.set("userData", res);
      }),
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    )
    .subscribe();
  }


  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: "Error",
      buttons: ["OK"]
    });
    alert.then(alert => alert.present());
  }
}

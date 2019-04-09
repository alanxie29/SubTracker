import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { tap, catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { AlertController } from "@ionic/angular";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})

export class SubscriptionService {
  url = environment.url;
  userId: string = "";

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private alertController: AlertController
  ) {this.getUserId();}

  getUserId() {
    this.storage.get("userData").then(val => {
      this.userId = val.user._id;
      console.log(this.userId);
    });
  }

  createSubscription(data) {
    console.log(data);
    this.http.put(`${this.url}/api/create/${this.userId}`, data)
      .pipe(
        tap(res => {
          console.log(res)
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
    console.log(this.userId)
    this.http.delete(`${this.url}/api/delete/${this.userId}/${_id}`)
      .pipe(
        tap(res => {
          console.log(res)
          this.storage.set("userData", res);
        }),
        catchError(e => {
          this.showAlert(e.error.msg);
          throw new Error(e);
        })
      ).subscribe();
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

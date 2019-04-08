import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})

export class SubscriptionService {

  url = environment.url;
  userId: string = ''
  
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private alertController: AlertController,
    ) { }

  
  createSubscription(data) { console.log(data)
    this.getUserId()
    return this.http.put(`${this.url}/api/create/${this.userId}`, data)
    .pipe(
      tap(res => {
        this.storage.set('userData', res);
      }),
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  };
 
  getUserId() {
    this.storage.get('userData').then((val) => {
      this.userId = val.user._id
      console.log(this.userId);
    });
  };

  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }

}


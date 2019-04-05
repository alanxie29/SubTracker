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
  
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private alertController: AlertController,
    ) { }

  getSubscriptions() {
    return this.http.get(`${this.url}/api/getAll`)
    .subscribe((res) => {
      this.storage.set('Subscriptions', res)
      console.log(res);
      }),
    catchError(e => {
      this.showAlert(e.error.msg);
      throw new Error(e);
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


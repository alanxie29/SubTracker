import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {

  data = '';
  userData = null;


  constructor(
    private authService: AuthService, 
    private storage: Storage, 
    private toastController: ToastController) { }

  ngOnInit() {
    this.getUserData();
  }
  
  logout() {
    this.authService.logout();
  }

  getUserData() {
    this.authService.getUserData();
    this.userData = this.authService.userData;
    console.log(this.userData);
  }

  clearToken() {
    // ONLY FOR TESTING!
    this.storage.remove('access_token');

    let toast = this.toastController.create({
      message: 'JWT removed',
      duration: 3000
    });
    toast.then(toast => toast.present());
  }

}

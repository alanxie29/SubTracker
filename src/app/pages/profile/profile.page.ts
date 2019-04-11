import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { User } from 'src/models/user';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  data = '';
  userObj: User;


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
    this.storage.get('userData').then((val) => {
      this.userObj = new User(val.user._id, val.user.email, val.user.firstName, val.user.lastName, val.user.phoneNumber)
      console.log(this.userObj);
    });
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

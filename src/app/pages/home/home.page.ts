import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subscription } from 'src/models/subscription';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  subscriptionsList: Subscription[] = [];

  constructor( 
    private storage: Storage,
    ) { }

  ngOnInit() {
    this.getSubscriptions()
  } 

  getSubscriptions() {
    this.storage.get('userData').then((val) => {
      val.user.subscriptions.forEach(sub => {
        this.subscriptionsList.push(sub);
      });
    });
  }

}

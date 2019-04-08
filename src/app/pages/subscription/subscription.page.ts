
import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';
import { Subscription } from 'src/models/subscription';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})

export class SubscriptionPage implements OnInit {

  subscriptionsList: Subscription[] = [];

  constructor(
    private subscription: SubscriptionService,
    private storage: Storage,
    ) {}

  ngOnInit() {
    this.getSubscriptions();
  } 

  getSubscriptions() {
    this.storage.get('userData').then((val) => {
      val.user.subscriptions.forEach(sub => {
        this.subscriptionsList.push(sub);
      });
    });
  }
  

}

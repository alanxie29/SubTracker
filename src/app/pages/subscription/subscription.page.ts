
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
  firstName: string = 'null';
  today = new Date();

  constructor(
    private subscriptionService: SubscriptionService,
    private storage: Storage,
    ) { }
  

  ngOnInit() {

    
  } 

  ionViewDidEnter() {
    this.getSubscriptions();
  }
  
  getSubscriptions() {
    this.subscriptionsList.length = 0
    this.storage.get('userData').then((val) => {
      val.user.subscriptions.forEach(sub => {
        this.subscriptionsList.push(sub);
      });
      console.log(this.subscriptionsList);
    });
  };


  removeSub(subscription) {
    let index = this.subscriptionsList.indexOf(subscription)
    if(index > -1) {
      this.subscriptionsList.splice(index, 1);
    }
    this.subscriptionService.deleteSubscription(subscription._id)
  }
}

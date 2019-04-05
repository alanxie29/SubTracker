
import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';
import { SubscriptionList } from '../../../models/subscriptionList';
import { Subscription } from '../../../models/subscription';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})

export class SubscriptionPage implements OnInit {

  constructor(
    private subscription: SubscriptionService,
    private storage: Storage,
    ) {}

  ngOnInit() {
    this.subscription.getSubscriptions();
  } 



  retrieveSubscriptions() {
    
  }
  

}

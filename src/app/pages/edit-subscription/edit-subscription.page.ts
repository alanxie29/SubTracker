import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-edit-subscription',
  templateUrl: './edit-subscription.page.html',
  styleUrls: ['./edit-subscription.page.scss'],
})
export class EditSubscriptionPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

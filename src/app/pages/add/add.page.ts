import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  subscriptionForm: FormGroup

  constructor(private subscriptionService: SubscriptionService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.subscriptionForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      renewalPeriod: ['', [Validators.required]],
      price: ['', [Validators.required]]
    })
  }
}

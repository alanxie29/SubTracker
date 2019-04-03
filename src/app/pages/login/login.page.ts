import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { Subscription, IPriceSubscription, IDurrationSubscription, Subscription2}  from '../../../models/subscription';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],

    });
    this.hello()
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe();
  }

  subscriptions: Subscription2[] = [new Subscription2()]

  hello() {
    let prices: IPriceSubscription[] = this.subscriptions
    console.log(prices[0].DEC_ID)

    let durrations: IDurrationSubscription[] = this.subscriptions
    console.log(durrations[0].durration.day)
  }

}

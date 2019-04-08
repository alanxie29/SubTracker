import { Subscription } from './subscription';

export class User extends Object{
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  subscriptions: Subscription[];

  constructor(id: string, email: string, firstName: string, lastName: string, subscriptions: Subscription[]) {
    super()
    this.id = id,
    this.email = email,
    this.firstName = firstName,
    this.lastName = lastName,
    this.subscriptions = subscriptions
  }
}

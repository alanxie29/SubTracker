
export class Subscription extends Object {
  name: string;
  description: string;
  startDate: Date;
  renewalPeriod: string;
  price: number;

  constructor(name: string, description: string, startDate: Date, renewalPeriod: string, price: number) {
    super()
    this.name = name;
    this.description = description;
    this.startDate = startDate
    this.renewalPeriod = renewalPeriod;
    this.price = price;
  }
}

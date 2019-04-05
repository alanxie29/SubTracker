
export class Subscription extends Object {
  name: string;
  description: string;
  duration: number;
  price: number;

  constructor(name: string, description: string, duration: number, price: number) {
    super()
    this.name = name;
    this.description = description;
    this.duration = duration;
    this.price = price;
  }
}

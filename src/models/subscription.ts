
export class Subscription implements IPriceSubscription, IDurrationSubscription {
  _id: string
  _name: string
  _cost: number
  _duration: number

  constructor() {
    this._id = 'asdfasfddadfasdf';
    this._name = '';
    this._cost = 0;
    this._duration = 7777777;
  }

  get DEC_ID(): string {
    return this.id
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }
  
  get durration(): Date {
    return new Date()
  }

  set name(value) {
    value = "{" + value + "}"
    this._name = value
  }
  get price(): number {
    return this._cost
  }
}


export class Subscription2 extends Subscription {

}
export interface IPriceSubscription {
  DEC_ID: string;
  name: string;
  price: number;
}

export interface IDurrationSubscription {
  id: string;
  name: string;
  durration: Date;
}

class Date {
  day: string = 'hello'
}
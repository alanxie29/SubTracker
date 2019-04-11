
export class User extends Object{
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;

  constructor(id: string, email: string, firstName: string, lastName: string, phoneNumber: string) {
    super()
    this.id = id,
    this.email = email,
    this.firstName = firstName,
    this.lastName = lastName,
    this.phoneNumber = phoneNumber
  }
}

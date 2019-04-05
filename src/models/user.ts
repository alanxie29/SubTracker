export class User extends Object{
  id: string;
  email: string;
  firstName: string;
  lastName: string

  constructor(id: string, email: string, firstName: string, lastName: string) {
    super()
    this.id = id,
    this.email = email,
    this.firstName = firstName,
    this.lastName = lastName
  }
}

export class User {
  id: string;
  email: string;
  firstName: string;
  lastName: string

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
}

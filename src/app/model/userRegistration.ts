export class UserRegistration {
  public name?: string;
  public cpf?: string;
  public email?: string;
  public role?: 'ROLE_USER' | 'ROLE_GERENTE' | 'ROLE_ADMIN';
  public username?: string;
  public password?: string;

  constructor(userRegistration?: Partial<UserRegistration>) {
    if (userRegistration) {
      Object.assign(this, userRegistration);
    }
  }
}

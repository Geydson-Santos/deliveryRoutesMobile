export class User {
  public id?: any;
  public username?: string;
  public name?: string;
  public cpf?: string;
  public email?: string;
  public active?: boolean;
  public role?: 'ROLE_USER' | 'ROLE_GERENTE' | 'ROLE_ADMIN';

  constructor(user?: Partial<User>) {
    if (user) {
      Object.assign(this, user);
    }
  }
}

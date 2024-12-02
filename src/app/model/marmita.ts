export class Marmita {
  public id?: string;
  public nome?: string;
  public descricao?: string;
  public valor?: number;

  constructor(marmita: Partial<Marmita>) {
    if (marmita) {
      Object.assign(this, marmita);
    }
  }
}

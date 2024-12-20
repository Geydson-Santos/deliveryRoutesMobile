export class Pedido {
  public nomeCliente?: string;
  public cpf?: string;
  public telefone?: string;
  public enderecoCompleto?: string;
  public rua?: string;
  public numero?: string;
  public complemento?: string;
  public referencia?: string;
  public cep?: string;
  public cidade?: string;
  public estado?: string;
  public pais?: string;
  public enderecoId?: number;
  public datahora?: string;
  public marmitaId?: number;
  public obs?: string;
  public pagamento?: string;
  public troco?: number;
  public valorTotal?: number;
  public valorTotalString?: string;
  public quantidade?: number;
  public latitude?: number;
  public longitude?: number;

  constructor(pedido: Partial<Pedido>) {
    if (pedido) {
      Object.assign(this, pedido);
    }
  }
}

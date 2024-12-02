export class Coordenadas {
  public lat?: number;
  public lng?: number;

  constructor(coordenadas: Partial<Coordenadas>) {
    if (coordenadas) {
      Object.assign(this, coordenadas);
    }
  }
}

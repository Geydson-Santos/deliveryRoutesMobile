import { Component, OnInit } from '@angular/core';
import {addIcons} from "ionicons";
import {arrowBackOutline} from "ionicons/icons";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon, IonInput, IonInputPasswordToggle, IonItem,
  IonList, IonSelect, IonSelectOption,
  IonTitle, IonToast,
  IonToolbar
} from "@ionic/angular/standalone";
import {Router, RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MarmitaService} from "../../../service/marmita.service";
import {Marmita} from "../../../model/marmita";
import {UserRegistration} from "../../../model/userRegistration";
import {PedidoService} from "../../../service/pedido.service";
import {Pedido} from "../../../model/pedido";
import {UserService} from "../../../service/user.service";
import {User} from "../../../model/user";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {GeocodeService} from "../../../service/geocode.service";
import {Coordenadas} from "../../../model/coordenadas";

@Component({
  selector: 'app-create',
  templateUrl: './pedidos-create.component.html',
  styleUrls: ['./pedidos-create.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonIcon,
    IonContent,
    IonList,
    IonButton,
    RouterLink,
    IonInput,
    IonInputPasswordToggle,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonToast,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ],
  standalone: true
})
export class PedidosCreateComponent implements OnInit {

  error: boolean = false;

  errorMessage: string = "";

  loading: boolean = false;

  cep: string = "";

  bairro: string = "";

  rua: string = "";

  numero: string = "";

  complemento: string = "";

  referencia: string = "";

  cidade: string = "";

  estado: string = "";

  enderecoCompleto: string = "";

  tiposDeMarmita: Marmita[] = [];

  marmitaSelecionadaId: string = "";

  observacao: string = "";

  formasPagamentos: { code: string; name: string }[] = [
    { name: 'Dinheiro', code: 'DINHEIRO' },
    { name: 'Cartão Crédito', code: 'CARTAO_CREDITO' },
    { name: 'Cartão Débito', code: 'CARTAO_DEBITO' },
    { name: 'Pix', code: 'PIX' },
  ];

  pagamento: string = "";

  troco: number = 0.0;

  quantidade: number = 1;

  valorTotal: number = 0.0;

  latitude: number = 0.0;

  longitude: number = 0.0;

  constructor(private marmitaService: MarmitaService, private pedidoService: PedidoService, private geocodeService: GeocodeService, private router: Router) {
    addIcons({arrowBackOutline})
  }

  ngOnInit() {
    this.marmitaService.getAllMarmitas().subscribe({
      next: (marmitas) => {
        this.tiposDeMarmita = marmitas;
      }
    })
  }

  async viaCep() {
    if(this.cep.length == 8){
      let responseJson = await (await fetch(`https://viacep.com.br/ws/${this.cep}/json/`)).json();
      this.rua = responseJson.logradouro;
      this.bairro = responseJson.bairro;
      this.complemento = responseJson.complemento;
      this.estado = responseJson.estado;
      this.cidade = responseJson.localidade;
    }
  }

  calcularValorTotal() {
    let valorMarmitaSelecionada: number = this.tiposDeMarmita.find((marmita: Marmita) => marmita.id == this.marmitaSelecionadaId)?.valor || 0;
    this.valorTotal = valorMarmitaSelecionada * this.quantidade;
  }

  calcularEnderecoCompleto() {
    this.enderecoCompleto = `${this.rua + (this.numero == "" ? "" : ", " + this.numero)}, ${this.cidade}, ${this.estado}`;
  }

  async fazerPedido() {
    this.loading = true;
    let coordenadasJson = await (await fetch(`https://nominatim.openstreetmap.org/search.php?q=${encodeURI(this.enderecoCompleto + ", Brazil")}&polygon_geojson=1&format=jsonv2`)).json();

    let coordendas: Coordenadas = new Coordenadas({lat: parseFloat(coordenadasJson[0].lat), lng: parseFloat(coordenadasJson[0].lon)});

    let usuarioAtual: User = JSON.parse(sessionStorage.getItem("usuarioJson") || "");
    if(this.cep != "" && this.bairro != "" && this.rua != "" && this.complemento != "" && this.referencia != "" && this.cidade != "" && this.estado != "" && this.marmitaSelecionadaId != "" && this.pagamento != "" && this.quantidade > 0 && this.valorTotal != 0){
      this.loading = true;
      this.pedidoService.createPedido(new Pedido({nomeCliente: usuarioAtual.name, cpf: usuarioAtual.cpf, enderecoCompleto: this.enderecoCompleto, rua: this.rua, numero: this.numero, complemento: this.complemento, referencia: this.referencia, cep: this.cep, cidade: this.cidade, estado: this.estado, pais: "Brasil", enderecoId: 1, marmitaId: parseInt(this.marmitaSelecionadaId), obs: this.observacao, pagamento: this.pagamento, latitude: coordendas.lat, longitude: coordendas.lng, troco: this.troco, valorTotal: this.valorTotal, quantidade: this.quantidade})).subscribe({
        next: (pedido) => {
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });
        },
        error: (error) => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

}

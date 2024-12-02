import {Component, OnInit} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon, IonItem, IonLabel, IonList, IonRefresher, IonRefresherContent, IonSpinner, IonTab, IonTabBar, IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {add, home, menu} from "ionicons/icons"
import {PedidoService} from "../../service/pedido.service";
import {Router, RouterLink} from "@angular/router";
import {Pedido} from "../../model/pedido";
import {NgForOf, NgIf} from "@angular/common";
import {User} from "../../model/user";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonTab,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonList,
    IonItem,
    IonLabel,
    IonRefresher,
    IonRefresherContent,
    NgForOf,
    RouterLink,
    NgIf,
    IonSpinner
  ],
  standalone: true
})
export class HomeComponent implements OnInit {

  username: string = "";

  pedidos: Pedido[] = [];

  usuarioAtual?: User;

  loading: boolean = false;

  constructor(private pedidoService: PedidoService, private userService: UserService, private router: Router) {
    addIcons({ add, home, menu });

    this.username = JSON.parse(atob((localStorage.getItem("token") + "").split(".")[1])).sub;
  }


  ngOnInit() {
    this.loading = true;
    this.userService.getUserByUsername(this.username).subscribe({
      next: (usuario) => {
        this.usuarioAtual = usuario;
        sessionStorage.setItem("usuarioJson", JSON.stringify(this.usuarioAtual));
        this.getPedidos();
      }
    })
  }

  getPedidos() {
    this.loading = true;
    this.pedidos = [];
    return this.pedidoService.getAllPedidos().subscribe(
      {
        next: (pedidos) => {
          this.pedidos = pedidos.filter((pedido) => pedido.cpf == (this.usuarioAtual || {}).cpf).map((pedido) => {
            let dataHora = new Date(new Date(pedido.datahora || "").getTime() - (1000 * 3600 * 3));

            pedido.datahora = `${dataHora.toLocaleDateString("pt-BR")} ${dataHora.toLocaleTimeString("pt-BR")}`;

            pedido.valorTotalString = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(pedido.valorTotal || 0);

            return pedido;
          }).sort((pedido1: Pedido, pedido2: Pedido) => {
            return new Date(pedido2.datahora || "").getTime() - new Date(pedido1.datahora || "").getTime();
          });
          //this.pedidos = pedidos;
        }, error: (erro) => {
          this.loading = false;
        }, complete: () => {
          this.loading = false;
        }
      }
    )
  }


  refreshPedidos(event: any): void {
    this.getPedidos().add(() => {
      console.log("foi");
      event.target.complete();
    });
  }
}

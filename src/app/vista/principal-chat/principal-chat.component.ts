import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service';
import { ChatsocketComponent } from '../chatsocket/chatsocket.component';
import { ListausuariosComponent } from '../listausuarios/listausuarios.component';

declare var SockJS;

declare var Stomp;

declare var alertify;

@Component({
  selector: 'app-principal-chat',
  templateUrl: './principal-chat.component.html',
  styleUrls: ['./principal-chat.component.sass']
})
export class PrincipalChatComponent implements OnInit {

  @ViewChild("chatcomp") child: ChatsocketComponent;
  @ViewChild("listausers") lista: ListausuariosComponent;


  public url: string = "http://localhost:8080";
  public socket;
  public stompClient;



  public seleccionado = -1;


  constructor(private usuariosPrd: UsuariosService) { }

  ngOnInit(): void {


    let usuario = this.usuariosPrd.getUser();


    type sa = [];

    this.socket = new SockJS(this.url + '/conectar');
    this.stompClient = Stomp.over(this.socket);
    let usuariosPrd = this.usuariosPrd;

    let cc = this.stompClient;
    let lista = this.lista;

    this.stompClient.connect({}, function (frame) {

      cc.subscribe("/topic/messages/" + usuario.nickname, function (response) {
        let data = JSON.parse(response.body);
        console.log("Esto se recibe");
        let obj = {
          mensaje: data.mensaje,
          nickname: data.nickname,
          quien: 'otro',
          paraquien: data.paraquien,
          visto: false
        }


        let encontrado = false;

        for (let item of usuariosPrd.getarreglo()) {
          console.log(item.nickname == obj.nickname);
          if (item.nickname == obj.nickname) {

            encontrado = true;
            item.historial.push(obj);
            break;
          }
        }


        if (!encontrado) {//eso quiere decir que ha cambiado el nombre de usuario o algo...

          //Hacemos otra vez la peticion y queda
          usuariosPrd.getAllUsers().subscribe(datos => {

            let arreglo = usuariosPrd.getarreglo();


            for (let item of datos) {

              for (let x of arreglo) {
                if (x.nickname.includes(item.nickname)) {
                  item.historial = x.historial;
                  break;
                }
              }

              if (item.historial == undefined) {
                item.historial = [];
              }

            }

            for (let x = 0; x < datos.length; x++) {
              if (datos[x].nickname.includes(usuario.nickname)) {
                datos.splice(x, 1);
              }
            }


            arreglo = datos;

            usuariosPrd.setarreglo(arreglo);

            for (let item of usuariosPrd.getarreglo()) {
              console.log(item.nickname == obj.nickname);
              if (item.nickname == obj.nickname) {

                encontrado = true;
                item.historial.push(obj);
                break;
              }
            }

            alertify.success(`Haz recibido un mensaje de ${obj.paraquien}`);
          });

        } else {
          alertify.success(`Haz recibido un mensaje de ${obj.paraquien}`);
        }


      });
    });


    //Solo para actualizar las listas de usuarios
    this.ejecutarTiempoReal();

  }


  public ejecutarTiempoReal() {

    setTimeout(() => {
      this.lista.ngOnInit();
      this.ejecutarTiempoReal();
    }, 1000);


  }

  public enviarMensaje(usuario, mensaje, paraquien) {
    let ss = this.usuariosPrd.getUser();


    this.stompClient.send("/entrada/chat/" + usuario, {}, JSON.stringify({
      nickname: ss.nickname,
      mensaje: mensaje,
      paraquien: paraquien
    }));



  }



  public recibir($event) {
    this.enviarMensaje($event.usuario, $event.mensaje, $event.paraquien);
  }

  public recibirUserSeleccionado($event) {
    this.child.recibirChat($event);


  }






}

import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service';
import { ChatsocketComponent } from '../chatsocket/chatsocket.component';
import { ListausuariosComponent } from '../listausuarios/listausuarios.component';

declare var SockJS;

declare var Stomp;

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
           mensaje :data.mensaje,
           nickname:data.nickname,
           quien:'otro',
           paraquien:data.paraquien,
           visto:false
         }

         for(let item of usuariosPrd.getarreglo()){
           console.log(item.nickname == obj.nickname);
            if(item.nickname == obj.nickname){

                item.historial.push(obj);
                break;
            }
         }

         console.log(usuariosPrd.getarreglo());
      });
    });


    //Solo para actualizar las listas de usuarios
    this.ejecutarTiempoReal();

  }


  public ejecutarTiempoReal(){

    setTimeout(() => {
      this.lista.ngOnInit();
      this.ejecutarTiempoReal();
    }, 1000);

    
  }

  public enviarMensaje(usuario, mensaje,paraquien) {
    let ss = this.usuariosPrd.getUser();


    this.stompClient.send("/entrada/chat/" + usuario, {}, JSON.stringify({
      nickname: ss.nickname,
      mensaje: mensaje,
      paraquien:paraquien
    }));



  }



  public recibir($event) {
    this.enviarMensaje($event.usuario, $event.mensaje,$event.paraquien);
  }

  public recibirUserSeleccionado($event) {    
    this.child.recibirChat($event);


  }

 




}

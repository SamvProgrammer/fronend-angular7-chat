import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-chatsocket',
  templateUrl: './chatsocket.component.html',
  styleUrls: ['./chatsocket.component.sass']
})
export class ChatsocketComponent implements OnInit {

  @Output() eventoFunciones = new EventEmitter();
  public chatSeleccionado:boolean = false;

  public usuario;

  constructor(private usuarioPrd:UsuariosService) { }

  ngOnInit(): void {
  }


  public enviandoMensaje(mensaje){
    let obj = {
        usuario:this.usuario.nickname,
        mensaje:mensaje.value,
        quien:'yo',
        paraquien:this.usuarioPrd.getUser().nickname,
        visto:true
    };
    for(let item of this.usuarioPrd.getarreglo()){
       if(item.nickname.includes(this.usuario.nickname)){
         item.historial.push(obj);
        break;
       }
    }
    this.eventoFunciones.emit(obj);
    mensaje.value = "";
  }


  public recibirChat($event){
    this.chatSeleccionado = true;

    let arreglo = this.usuarioPrd.getarreglo();


    this.usuario = arreglo[$event];
    for(let item of this.usuario.historial){
        item.visto = true;
    }
  }

}

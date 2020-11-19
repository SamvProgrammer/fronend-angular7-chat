import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-listausuarios',
  templateUrl: './listausuarios.component.html',
  styleUrls: ['./listausuarios.component.sass']
})
export class ListausuariosComponent implements OnInit {
  public arreglo = [];
  public usuario;
  @Output() eventoFunciones = new EventEmitter();
  


  constructor(private usuariosPrd:UsuariosService) { }

  ngOnInit(): void {


    this.usuario = this.usuariosPrd.getUser();
    console.log(this.usuario);
    console.log("cambiado esto");
    this.usuariosPrd.getCantidadPersonas().subscribe(cantidad =>{
      if(cantidad != this.arreglo.length+1 || this.usuario.cambiado){
        this.usuario.cambiado = false;
        
        this.usuariosPrd.getAllUsers().subscribe(datos =>{

          

          for(let item of datos){

            for(let x of this.arreglo){
                if(x.nickname.includes(item.nickname)){
                  item.historial = x.historial;
                  break;
                }
            }

            if(item.historial == undefined){
              item.historial = [];
            }
           
        }

        for(let x = 0; x<datos.length; x++){
            if(datos[x].nickname.includes(this.usuario.nickname)){
                datos.splice(x,1);
            }
        }
          
         
          this.arreglo = datos;
          
          this.usuariosPrd.setarreglo(this.arreglo);
        });
      }
    });
  }

  public seleccionarChat(indice){
     this.eventoFunciones.emit(indice);
  }

  public getUsuariosActivos(){
    return this.arreglo;
  }

  public mensajesenviados(indice){
      let arreglo = this.usuariosPrd.getarreglo();
      let cantidad = 0;
      let user = arreglo[indice];
      for(let item of user.historial){
          if(!item.visto){
            cantidad++;
          }
      }
      return cantidad;
  }

  public actualiza(){
    this.usuario.cambiado = true;
  }
}

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
    this.usuariosPrd.getCantidadPersonas().subscribe(cantidad =>{
      if(cantidad != this.arreglo.length+1){
        
        this.usuariosPrd.getAllUsers().subscribe(datos =>{
          let contador = 0;
          let encontrado = false;
          for(let item of datos){
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
}

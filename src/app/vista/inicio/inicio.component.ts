import { Component, Inject, OnInit } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CambiarusuarioComponent } from './cambiarusuario/cambiarusuario.component';


declare var alertify;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.sass']
})
export class InicioComponent implements OnInit {
  public usuario: any = {};
  public cantidad:Number = 0;


  animal: string;
  name: string;

  constructor(private usuariosPrd: UsuariosService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.usuariosPrd.getUsuarioInicial().subscribe(datos => {
      this.usuario = datos;
    });

    this.usuariosPrd.getCantidadPersonas().subscribe(cantidad =>{
        this.cantidad = cantidad;
    });
  }


  abrirDialogo(): void {

    console.log("Sis e cambia esto");
   let dialogo =  this.dialog.open(CambiarusuarioComponent);
   dialogo.afterClosed().subscribe(datos =>{
     if(datos != undefined){
         this.usuario.cambiara = datos;
         this.usuariosPrd.cambiarUsuario(this.usuario).subscribe(respuesta =>{
           if(respuesta.afectado){
              this.usuario.nickname = datos;
              this.usuario.cambiado = true;
              alertify.success(respuesta.respuesta);
           }else{

             alertify.error(respuesta.respuesta);
           }
         });
     }
   });

  }

  public entrarChat(){
   
    this.usuariosPrd.setUser(this.usuario);
  }

}



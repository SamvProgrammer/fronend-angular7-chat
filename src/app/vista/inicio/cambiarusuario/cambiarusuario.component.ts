import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-cambiarusuario',
  templateUrl: './cambiarusuario.component.html',
  styleUrls: ['./cambiarusuario.component.sass']
})
export class CambiarusuarioComponent implements OnInit {

  public form: FormGroup;

  constructor(public formBuilder: FormBuilder,private dialogRef: MatDialogRef<CambiarusuarioComponent>) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      usuario: ''
  });
  }


  public enviarformulario(){
    let obj = this.form.value;
    this.dialogRef.close(obj.usuario);
  }

  public cerrarForm(){
    this.dialogRef.close();
  }

}

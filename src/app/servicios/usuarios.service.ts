import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url:string = "http://localhost:8080/api";
  private usuario;
  private arreglo = [];

  constructor(private http:HttpClient) { }

  public getUsuarioInicial():Observable<any>{
       return this.http.get(`${this.url}/usuario`);
  }

  public getCantidadPersonas():Observable<any>{
    return this.http.get(`${this.url}/getTotalUsers`);
  }

  public cambiarUsuario(obj):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let json = JSON.stringify(obj);
    return this.http.post(`${this.url}/usuario`,json,httpOptions);
  }

  public getAllUsers():Observable<any>{
     return this.http.get(`${this.url}/listausuarios`);
  }

  public setUser(obj){
    this.usuario = obj;
  }
  public getUser(){
    return this.usuario;
  }

  public setarreglo(obj){
    this.arreglo = obj;
  }
  public getarreglo(){
    return this.arreglo;
  }
}

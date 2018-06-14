import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class UsuariosService{
  constructor(public afDB: AngularFireDatabase){

  }

  public getUsuarios(){
    return this.afDB.list('/usuarios/');
  }

  public getUsuario(id){
    return this.afDB.object('/usuarios/' + id);
  }

  public createUsuario(usuario){
    return this.afDB.database.ref('/usuarios/' + usuario.id).set(usuario);
  }

  public editUsuario(usuario){
    return this.afDB.database.ref('/usuarios/' + usuario.id).set(usuario);
  }

  public getUsuarioByEmail(email)
  {
        return this.afDB.database.ref('usuarios').orderByChild('email').equalTo(email);
  }

  //public deleteUsuario(usuario){}
}

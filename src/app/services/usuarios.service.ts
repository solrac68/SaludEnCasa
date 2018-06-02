import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";
import {Router} from "@angular/router";
import {Http, Headers} from "@angular/http"
import 'rxjs/add/operator/map';


@Injectable()
export class UsuariosService{
  constructor(public afDB: AngularFireDatabase){

  }
  
  public getUsuarios(){
    return this.afDB.list('/usuarios/');
  }

  public getUsuario(uid){
    return this.afDB.object(`/usuarios/1525411847818`);
  }
  
  public createUsuario(usuario){
    return this.afDB.database.ref('/usuarios/' + usuario.id).set(usuario);
  }

  public editUsuario(usuario){
    return this.afDB.database.ref('/usuarios/' + usuario.id).set(usuario);
  }

  //public deleteUsuario(usuario){}
}

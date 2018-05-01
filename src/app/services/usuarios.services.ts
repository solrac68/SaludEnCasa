import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";

@Injectable()
export class UsuariosService{
  constructor(public afDB: AngularFireDatabase){

  }

  public getUsuarios(){
    return this.afDB.list(pathOrRef: '/usuarios/');
  }

  public getUsuario(id){
    return this.afDB.object(pathOrRef: '/usuarios/' + id);
  }

  public createUsuario(usuario){
    return this.afDB.database.ref(path: '/usuarios/' + usuario.id).set(usuario);
  }

  public editUsuario(usuario){
    return this.afDB.database.ref(path: '/usuarios/' + usuario.id).set(usuario);
  }

  //public deleteUsuario(usuario){}
}

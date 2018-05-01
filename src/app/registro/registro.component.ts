import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutorizacionService } from '../services/autorizacion.service';
import { UsuariosService } from '../services/usuarios.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent {
  registro:any = {};
  usuario:any = {};
  code = "";
  caracteres = "0123456789abcdefABCDEF?¿¡!:;";
  longitud = 8;
  x = 0;
  rand = 0;

  constructor(private autorizacionService:AutorizacionService, private usuariosService: UsuariosService){

  }

  //registrar(){
  //  this.autorizacionService.registro(this.registro.email,this.registro.password);
  //}

  public guardarUsuario(){

    for (this.x=0; this.x < this.longitud; this.x++)
    {
      this.rand = Math.floor(Math.random()*this.caracteres.length);
      this.code += this.caracteres.substr(this.rand, 1);
    }

    if(!this.usuario.id){
      this.usuario.id = Date.now();
      this.usuario.password = this.code;
    }
    console.log(this.usuario);
    this.usuariosService.createUsuario(this.usuario).then(() =>{
      this.usuario = {};
      console.log("Usuario creado correctamente.");
    });
    this.autorizacionService.registro(this.usuario.email,this.usuario.password);
  }

}

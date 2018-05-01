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

  constructor(private usuariosService: UsuariosService){
  }

  //registrar(){
  //  this.autorizacionService.registro(this.registro.email,this.registro.password);
  //}

  guardarUsuario(){
    this.usuario.id = Date.now();
    console.log(this.usuario);
    this.usuariosService.createUsuario(this.usuario).then(() =>{
      this.usuario = {};
      console.log("Usuario creado correctamente.");
    });
  }
}

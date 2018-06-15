import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutorizacionService } from '../services/autorizacion.service';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';


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

  constructor(private autorizacionService:AutorizacionService, private usuariosService: UsuariosService, private route:Router){}


  public guardarUsuario(){
      this.usuario.id = Date.now()
      switch (+this.usuario.tipo) {
        case 1:
          this.usuario.tipoT = "Administrador"
          break;
        case 2:
          this.usuario.tipoT = "Mensajero"
          break;
        case 3:
          this.usuario.tipoT = "Cliente"
          break;
      }
      this.usuariosService.createUsuario(this.usuario).then(() =>{
          this.usuario = {};
      })
      this.autorizacionService.registro(this.usuario.email,this.usuario.password)
      this.autorizacionService.logout()
      this.route.navigate([''])
    }
}
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutorizacionService } from '../services/autorizacion.service';
import { UsuariosService } from '../services/usuarios.service';
//import { RegistroComponent } from './registro/registro.component';

@Component({
  selector: 'app-registro-list',
  templateUrl: './registro-userlist.component.html'
})
export class UsuariosListComponent {

  usuarios:any = [];

  constructor(private usuariosService: UsuariosService){
    this.usuariosService.getUsuarios().valueChanges()
      .subscribe((fbUsuarios)=>{
        this.usuarios = fbUsuarios;
      })
  }

  seleccionarUsuario(usuario){
    //Abrir un modal y cargar datos para editar
  }


}

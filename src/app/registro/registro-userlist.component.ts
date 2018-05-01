import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutorizacionService } from '../services/autorizacion.service';
import { UsuariosService } from '../services/usuarios.service';


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
        console.log(this.usuarios);
      })
  }


}

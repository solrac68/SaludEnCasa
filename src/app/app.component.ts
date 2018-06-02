import { Component } from '@angular/core';
import { AutorizacionService } from './services/autorizacion.service';
import { LugaresService } from './services/lugares.service';
import { UsuariosService } from './services/usuarios.service';
import { Usuario } from './usuario';
import { Router } from '@angular/router';
import { Key } from 'protractor';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  loggedIn = false;
  email = null;
  numeroProductos:any = null;
  usuarioList:Usuario[];
  usuario:any;
  constructor(private autorizacionService:AutorizacionService,private route:Router,private lugaresService:LugaresService){
    this.autorizacionService.isLogged()
      .subscribe((result) => {
        if(result && result.uid){
          this.loggedIn = true;
          this.email = this.autorizacionService.getEmail();
          lugaresService.obtenerProductosEnCarrito(this.email).on("value",(snapshot)=> {
            //debugger;
            let miscompras = snapshot.val();
            miscompras = Object.keys(miscompras).map((key)=>miscompras[key]);
            miscompras = miscompras.filter((obj) => {return obj.estado === 0});
            this.numeroProductos = miscompras.length;

        }

        );
      }else{
          this.loggedIn = false;
        }
      },(error) => {
        this.loggedIn = false;
      })
  
    }

  logout(){
    this.autorizacionService.logout();
  }

}

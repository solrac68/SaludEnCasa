import { Component } from '@angular/core';
import { AutorizacionService } from './services/autorizacion.service';
import { LugaresService } from './services/lugares.service';
import { UsuariosService } from './services/usuarios.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  loggedIn = false;
  autorizedAdmin:Boolean = false;
  email = null;
  numeroProductos:any = null;

  constructor(private autorizacionService:AutorizacionService,
    private lugaresService:LugaresService,
    private usuariosService:UsuariosService,
    private route:Router){

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
          });

          this.usuariosService.getUsuarioByEmail(this.email).on("value",(snapshot)=> {
            //debugger;
            let usuarios = snapshot.val();
            usuarios = Object.keys(usuarios).map((key)=>usuarios[key]);
            usuarios = usuarios.filter((obj) => {return obj.tipo == 1});
            if (usuarios.length > 0){
                    this.autorizedAdmin = true
            }
          });
        }
      },(error) => {
        this.loggedIn = false;
      })
  }

  logout(){
    this.autorizacionService.logout();
    this.route.navigate(['/login']);
  }

  ngOnInit() {
    //debugger
    //this.lugaresService.cargarBasedeDatosDomicilios();
  }

}

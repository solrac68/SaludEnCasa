import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LugaresService } from '../services/lugares.service';
import { ProductService } from '../services/producto.services';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import { FormControl } from '@angular/forms';
import {Http} from "@angular/http";
import { AutorizacionService } from '../services/autorizacion.service';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html'
})
export class CrearComponent {
  producto:any ={};
  id:any = null;
  
  guardarProducto(){
    //debugger
    if(this.id != 'new'){
      this.productosService.updateProducto(this.producto);
      alert('Editado con éxito');
      this.route.navigate(['/listaProductos']);
    }
    else{
      this.producto.id = Date.now(); // Para generar un id diferente cada vez ... 
      this.productosService.insertProducto(this.producto)
      //.subscribe((r)=>console.log(r), (e)=>console.log(e));
      alert('Negocio guardado con éxito');
    }
    this.producto = {};
  }

  constructor(private productosService: ProductService, 
              private autorizatioService:AutorizacionService, 
              private usuariosService:UsuariosService, 
              private route:Router,
              private routeA:ActivatedRoute){
  }

  ngOnInit(){
    this.autorizatioService.isLogged()
    .subscribe(
        (result) =>{
            if(result && result.uid){
                let email = result.email
                this.usuariosService.getUsuarioByEmail(email).on("value",(snapshot)=> {
                    //debugger;
                    let usuarios = snapshot.val();
                    usuarios = Object.keys(usuarios).map((key)=>usuarios[key]);
                    usuarios = usuarios.filter((obj) => {return obj.tipo == 1});
                    if (usuarios.length > 0){
                      this.id = this.routeA.snapshot.params['id'];  
                      if(this.id != 'new'){
                        this.productosService.obtenerProducto(this.id)
                          .valueChanges().subscribe((producto)=>{
                            //debugger;
                            this.producto = producto;
                          });
                        }    
                    }
                    else {
                      alert("No esta autorizado para este servicio")
                      this.route.navigate(['']);
                    }
                });
              }else{
                alert("No esta autorizado para este servicio")
                this.route.navigate(['']);
              }
        }
    )
    
  }
}

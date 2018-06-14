import { Component } from '@angular/core';
import { ProductService } from '../services/producto.services';
import { AutorizacionService } from '../services/autorizacion.service';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lugares',
  templateUrl: './productos.component.html'
})

export class ProductosComponent {
  title = 'Salud En Casa';
 
  productos = null
  error:any = null
  visible:boolean = false

  constructor(private productService: ProductService, 
              private autorizatioService:AutorizacionService, 
              private usuariosService:UsuariosService, 
              private route:Router) {
  }


  eliminarProducto(producto){
    //debugger;
    this.productService.deleteProducto(producto);
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
                            this.productService.getProductos()
                            .valueChanges().subscribe((productos)=>{
                            this.productos = productos;
                            }, error => {
                              this.error = 'Tenemos algo de dificultades, disculpe las molestias. Error: ' + error.statusText;
                              this.visible = true;
                            });
                    }
                    else {
                      //alert("No esta autorizado para este servicio")
                      this.route.navigate(['']);
                    }
                });
              }else{
                //alert("No esta autorizado para este servicio")
                this.route.navigate(['']);
              }
        }
    )
    
  }

}

import { Component, OnInit} from '@angular/core';
import { AutorizacionService } from '../services/autorizacion.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/producto.services';
import { Producto } from './producto';
import { UsuariosService } from '../services/usuarios.service';
import { LugaresService } from '../services/lugares.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-gestProduct',
    templateUrl: './gestProduct.component.html'
  })

  export class GestProductComponent {
    productList: Producto[];
    email = null;
    consulta:any = null;
    constructor(private route:Router, private autorizacionService:AutorizacionService,private productService:ProductService, private usuariosService:UsuariosService,
        private lugaresService:LugaresService){
           
}
    
    buscar(){
        if(this.consulta === null || this.consulta.length === 0){
        this.ngOnInit();
        }
        else
        {
            this.lugaresService.obtenerProductosPorNombre(this.consulta).on("value",(s)=>{
            let productList = s.val();
            this.productList = Object.keys(productList).map((key)=>productList[key]);
            });
        }
    }
    ngOnInit(){
        this.productService.getProductos()
        .snapshotChanges()
        .subscribe(item=>{
            this.productList = [];
            item.forEach(element=>{
                let x = element.payload.toJSON();
                x["$key"] = element.key;
                this.productList.push(x as Producto);
            });
        });

    }

    onEdit(producto:Producto){
        //para no tener un doble enlace de datos
        this.productService.selectproducto = Object.assign({}, producto);
    }

    onDelete($key:string){
        this.productService.deleteProducto($key);
       alert("Producto eliminado correctamente");
    }
  }


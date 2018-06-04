import { Component } from '@angular/core';
import { ProductService } from '../services/producto.services';

@Component({
  selector: 'app-lugares',
  templateUrl: './productos.component.html'
})
export class ProductosComponent {
  title = 'Salud En Casa';
 
  productos = null
  error:any = null
  visible:boolean = false

  constructor(private productService: ProductService) {
    
    //Se cambia por que lo retornado es una promesa
    productService.getProductos()
            .valueChanges().subscribe((productos)=>{
            this.productos = productos;
          }, error => {
            this.error = 'Tenemos algo de dificultades, disculpe las molestias. Error: ' + error.statusText;
            this.visible = true;
          });
  }

  eliminarProducto(producto){
    //debugger;
    this.productService.deleteProducto(producto);
  }

}

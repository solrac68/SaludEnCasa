import { Component, OnInit} from '@angular/core';
import { ProductService } from '../services/producto.services';
import { NgForm } from '@angular/forms';
import { Producto } from './producto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html'
})
export class ProductoComponent implements OnInit{
  constructor(private productService: ProductService){}

  ngOnInit(){
    this.productService.getProductos();
    this.resetForm();
  }

  onSubmit(productForm:NgForm){
    if(productForm.value.$key == null){
      this.productService.insertProducto(productForm.value)
      alert("Producto ingresado correctamente");
    }else{
    this.productService.updateProducto(productForm.value);
       alert("Producto actualizado correctamente");
    }
    this.resetForm(productForm);
  }
  resetForm(productForm?:NgForm){
    if(productForm != null)
    productForm.reset();
    this.productService.selectproducto = new Producto;

    
  }
}

  



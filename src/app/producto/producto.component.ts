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
    this.productService.insertProducto(productForm.value);
    this.resetForm(productForm);

  }
  resetForm(productForm?:NgForm){
    if(productForm != null)
    productForm.reset();

    
  }
}

  



import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LugaresService } from '../services/lugares.service';
import { ProductService } from '../services/producto.services';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import { FormControl } from '@angular/forms';
import {Http} from "@angular/http";

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
    }
    else{
      this.producto.id = Date.now(); // Para generar un id diferente cada vez ... 
      this.productosService.insertProducto(this.producto)
      //.subscribe((r)=>console.log(r), (e)=>console.log(e));
      alert('Negocio guardado con éxito');
    }
    this.producto = {};
  }

  constructor(private productosService:ProductService,private route:ActivatedRoute){
    this.id = route.snapshot.params['id'];

    if(this.id != 'new'){
      productosService.obtenerProducto(this.id)
        .valueChanges().subscribe((producto)=>{
          // debugger;
          this.producto = producto;
    });
    }
  }
}

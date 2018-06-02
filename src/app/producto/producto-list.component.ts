
import { Component, OnInit} from '@angular/core';
import { ProductService } from '../services/producto.services';
import { Producto } from './producto';
import { NgForm } from '@angular/forms';
import { element } from 'protractor';
import { LugaresService } from '../services/lugares.service';
import { AutorizacionService } from '../services/autorizacion.service';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { Usuario } from '../usuario';



@Component({
    selector: 'app-producto-list',
    templateUrl: './producto-list.component.html'
  })

  export class ProductoListComponent implements OnInit{

    productList: Producto[];
    compra:any = {};
    email:any = null;
    consulta:any = null;
    usuarios:any = [];

    constructor(private autorizacionService:AutorizacionService, private route:Router,private productService: ProductService,private lugaresService:LugaresService,
    private usuariosService:UsuariosService){}

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
    
    comprar(){
        this.autorizacionService.isLogged()
      .subscribe((result) => {
        if(result && result.uid){
          this.email = this.autorizacionService.getEmail();
          //debugger;
          for(let producto of this.productList){
                if(producto.volumen > 0){
                    this.compra.id = Date.now();
                    this.compra.estado = 0;
                    this.compra.nombre = producto.nombre;
                    this.compra.precio = producto.precio;
                    this.compra.usuario = this.email;
                    this.compra.volumen = producto.volumen;
                    this.lugaresService.guardarProductosEnCarrito(this.compra);
                }
          }
          this.route.navigate(['checkout']);
        }else{
          this.route.navigate(['']);
        }
      },(error) => {
        this.route.navigate(['']);
      })
    }

    gestionarProduct(){
      this.autorizacionService.isLogged()
      .subscribe((result) => {
        if(result && result.uid){
         
          this.email = this.autorizacionService.getEmail();
          this.usuariosService.getUsuarios().valueChanges()
          .subscribe((fbUsuarios)=>{
           this.usuarios = fbUsuarios;
           for(let user of this.usuarios){
            if(user.email === this.email){
              if(user.tipo === "1"){
                this.route.navigate(['productos']);
              }
               
            }
          }
           
        })
      
      }else{
        this.route.navigate(['']);
      }
    },(error) => {
      this.route.navigate(['']);
    })

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

    
  }
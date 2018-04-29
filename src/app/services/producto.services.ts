import { Injectable } from "@angular/core";
import{AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Producto } from "../producto/producto";
//import { AngularFireAuth } from "angularfire2/auth";
//import {Router} from "@angular/router";

@Injectable()
export class ProductService{
    //para utilizar los métodos de firebase en esta clase
    productoList: AngularFireList<any>;
    //para guardar en esta clase la seleccion del producto que se haga
    //para poder mostrarlo...
    selectproducto: Producto = new Producto();
    constructor(private firebase: AngularFireDatabase) {}

    getProductos()
    {
        return this.productoList = this.firebase.list('productos');
    }

    insertProducto(producto:Producto)
    {
        //al agregar un producto a la lista
        //se agrega a la base de datos, con el push se agrega al final
        this.productoList.push({
            nombre: producto.nombre,
            categoria: producto.categoria,
            precio: producto.precio
            
         });
    }

    updateProducto(producto:Producto){
        this.productoList.update(producto.$key, {
            nombre: producto.nombre,
            categoria: producto.categoria,
            precio: producto.precio
            
        });
    }

    deleteProducto($key: string){
        this.productoList.remove($key);
    }
}
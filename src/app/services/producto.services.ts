import { Injectable } from "@angular/core";
import{AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Producto } from "../producto/producto";

@Injectable()
export class ProductService{

    constructor(private afDB: AngularFireDatabase) {}

    getProductos()
    {
        return this.afDB.list('productos/')
    }

    insertProducto(producto)
    {
        this.afDB.object('productos/'+producto.id).set(producto);
    }

    updateProducto(producto){
        this.afDB.object('productos/'+producto.id).update(producto)
    }

    deleteProducto(producto){
        this.afDB.object('productos/'+producto.id).remove();
    }

    public obtenerProducto(id)
    {
        return this.afDB.object('productos/'+id);
    }

    

}
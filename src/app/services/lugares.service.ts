import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import {Http, Headers} from "@angular/http"
import 'rxjs/add/operator/map';
@Injectable()
export class LugaresService{
    compras:any = {};

    API_ENDPOINT = 'https://platzisquare-4e1ba.firebaseio.com';
    constructor(private afDB:AngularFireDatabase,private http:Http){

    }
    public getLugares(){
        return this.afDB.list('lugares/')
    }

    public buscarLugar(id){
        return this.afDB.object('lugares/'+id);
    }

    public guardarLugar(lugar){
        this.afDB.object('lugares/'+lugar.id).set(lugar);
    }

    public actualizarLugar(lugar){
        this.afDB.object('lugares/'+lugar.id).update(lugar)
    }

    public obtenerGeodata(direccion){
        return this.http.get('http://maps.google.com/maps/api/geocode/json?address='+direccion);
    }

    public obtenerProductosEnCarrito(email)
    {
        return this.afDB.database.ref('compras').orderByChild('usuario').equalTo(email);
    }

    public obtenerProductos(id)
    {
        return this.afDB.object('productos/'+id);
    }

    public guardarEntrega(entrega){
        this.afDB.object('entregas/'+entrega.id).set(entrega);
    }

    public actualizarProductosEnCarrito(compra)
    {
        this.afDB.object('compras/'+compra.id).update(compra)
    }

    public guardarProductosEnCarrito(compra)
    {
        this.afDB.object('compras/'+compra.id).set(compra)
    }

    public obtenerProductosPorNombre(nombre)
    {
        return this.afDB.database.ref('productos').orderByChild('categoria').equalTo(nombre);
    }


    
}
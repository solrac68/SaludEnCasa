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
        
        //Este llamado envía toda la información ...

        // Solo trae información de lugares
        //return this.http.get(this.API_ENDPOINT + '/lugares.json');

        // return this.http.get(this.API_ENDPOINT + '/.json')
        //     .map((resultado)=>{
        //         const data = resultado.json().lugares;
        //         return data;
        //     });
    }

    public buscarLugar(id){
        return this.afDB.object('lugares/'+id);
    }

    public guardarLugar(lugar){
        //console.log(lugar)
        this.afDB.object('lugares/'+lugar.id).set(lugar);
        // const headers = new Headers({"Content-Type":"application/json"})
        // return this.http.post(this.API_ENDPOINT + '/lugares.json',lugar,{headers:headers})
    }

    public actualizarLugar(lugar){
        //console.log(lugar)
        this.afDB.object('lugares/'+lugar.id).update(lugar)
    }

    public obtenerGeodata(direccion){
        //http://maps.google.com/maps/api/geocode/json?address=78-43+diagonal+70f,+Bogota,Colombia
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


    
}
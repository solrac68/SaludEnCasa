import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import {Http} from "@angular/http"

@Injectable()
export class LugaresService{

    constructor(private afDB:AngularFireDatabase,private http:Http){

    }
    public getLugares(){
        //return this.lugares;
        return this.afDB.list('lugares/')
    }

    public buscarLugar(id){
        return this.afDB.object('lugares/'+id);
    }

    public guardarLugar(lugar){
        //console.log(lugar)
        this.afDB.object('lugares/'+lugar.id).set(lugar);
    }

    public actualizarLugar(lugar){
        //console.log(lugar)
        this.afDB.object('lugares/'+lugar.id).update(lugar)
    }

    public obtenerGeodata(direccion){
        //http://maps.google.com/maps/api/geocode/json?address=78-43+diagonal+70f,+Bogota,Colombia
        return this.http.get('http://maps.google.com/maps/api/geocode/json?address='+direccion);
    }
}
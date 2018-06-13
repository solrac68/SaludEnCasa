import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import {Http, Headers} from "@angular/http"
import 'rxjs/add/operator/map';
import { IDomicilio } from '../shared/domicilio.model';
import { marker } from '../shared/domicilio.model';
import { SAVED_DOMICILIOS }  from '../shared/domicilios';


@Injectable()
export class LugaresService{
    compras:any = {};
    VELOCIDAD:number = 13.9 // 13.9 m/s

    //API_ENDPOINT = 'https://platzisquare-4e1ba.firebaseio.com';
    constructor(private afDB:AngularFireDatabase,private http:Http){

    }
    public getDomicilios():IDomicilio[]{
        return SAVED_DOMICILIOS.slice(0);
    }

    public getDomiciliosDB(){
        return this.afDB.object('domicilios/')
    }

    public getDomicilio(id: number){
        //return SAVED_DOMICILIOS.slice(0).find(run => run.id == id)
        return this.afDB.object('domicilios/'+id)
    }

    public getDistance = function(p1:marker, p2:marker) {
        var R = 6378137; // Earth’s mean radius in meter
        var dLat = this.rad(p2.lat - p1.lat);
        var dLong = this.rad(p2.lng - p1.lng);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.rad(p1.lat)) * Math.cos(this.rad(p2.lat)) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d; // returns the distance in meter
    };

    public rad = function(x) {
        return x * Math.PI / 180;
    };

    public guardarDomicilios(domicilios:IDomicilio[])
    {
        for(let i=0;i < domicilios.length;i++){
            this.afDB.object('domicilios/'+domicilios[i].id).set(domicilios[i]);
        }
    }

    public guardarDomicilio(domicilio:IDomicilio)
    {
            this.afDB.object('domicilios/'+domicilio.id).set(domicilio);
    }

    public cargarBasedeDatosDomicilios()
    {
        let domicilios = this.getDomicilios()
        for(let i=0;i < domicilios.length;i++){
            domicilios[i].markers[0].distance = 0
            let TAMANOMARCAS = domicilios[i].markers.length
            let acum = 0 
            for( let j=1;j<TAMANOMARCAS;j++){
                acum = acum + this.getDistance(domicilios[i].markers[j-1],domicilios[i].markers[j])
                domicilios[i].markers[j].distance = Math.round(acum)
            }
            domicilios[i].distance = domicilios[i].markers[TAMANOMARCAS-1].distance
            this.afDB.object('domicilios/'+domicilios[i].id).set(domicilios[i]);
        }
    }

    public buscarPosicionEnRecorrido(domicilio:IDomicilio,tiempoTranscurrido:number):number {
        //SAVED_DOMICILIOS.slice(0).find(run => run.id == id)
        let distanciaAlcanzada:number = tiempoTranscurrido*this.VELOCIDAD // Distancia alcanzada en metros
        //console.log("distanciaAlcanzada: " + distanciaAlcanzada)
        return domicilio.markers.slice(0).findIndex(run => run.distance > distanciaAlcanzada )
    }

    public getfechaEntrega(domicilio:IDomicilio):number {
        return domicilio.dateInicio + 1000*(domicilio.distance/Math.round(this.VELOCIDAD))
    }

    public getfechaRetorno(domicilio:IDomicilio):number {
        return domicilio.dateInicio + 2000*(domicilio.distance/Math.round(this.VELOCIDAD))
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
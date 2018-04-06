import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class LugaresService{
    lugares:any = [
        {id:1,plan:'pagado',cercania:1,distancia:1,active:true, nombre:'Florería la gardenia'},
        {id:2,plan:'gratuito',cercania:1,distancia:1.8,active:true, nombre:'Donas la pasadita'},
        {id:3,plan:'gratuito',cercania:2,distancia:5,active:true, nombre:'Veterinaria la huellitas felices'},
        {id:4,plan:'gratuito',cercania:3,distancia:10,active:true, nombre:'Sushi Suhiroll'},
        {id:5,plan:'pagado',cercania:3,distancia:35,active:true, nombre:'Holtel la Gracia'},
        {id:6,plan:'gratuito',cercania:3,distancia:120,active:true, nombre:'Zapateria el clavo'},
        {id:7,plan:'pagado',cercania:3,distancia:35,active:true, nombre:'Holtel la Gracia'},
        {id:8,plan:'gratuito',cercania:3,distancia:120,active:true, nombre:'Zapateria el clavo'}
      ];

    constructor(private afDB:AngularFireDatabase){
        
    }
    public getLugares(){
        return this.lugares;
    }

    public buscarLugar(id){
        return this.lugares.filter((lugar) => { return lugar.id == id})[0] || null;
    }

    public guardarLugar(lugar){
        console.log(lugar)
    }
}
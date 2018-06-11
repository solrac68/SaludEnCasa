import { Component } from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import {Observable} from 'rxjs/Rx';
import { IDomicilio } from '../shared/domicilio.model';
import { marker } from '../shared/domicilio.model';
import { SAVED_DOMICILIOS }  from '../shared/domicilios';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css']
})
export class LugaresComponent {

  lat:number = 0;
  lng:number = 0;

  latn:number = 0;
  lngn:number = 0;

  
  domicilios:IDomicilio[] = null
  domicilio:IDomicilio = null
  //posicion:marker = null
  tiempo:any = 0
  step:number = 0
  error:any = null
  visible:boolean = false
  tiempoInicio:number=0
  tiempoMonitoreo:number=0
  posiciones:marker[] = []
  //ticks = 0;

  constructor(private lugaresService:LugaresService, private _route: ActivatedRoute) {
  }

  ngOnInit(){
    this.lat = 6.25054
    this.lng = -75.56812

    //Se cambia por que lo retornado es una promesa
    this.lugaresService.getDomiciliosDB()
            .valueChanges().subscribe((domicilios)=>{
            let consulta = Object.keys(domicilios).map(key => domicilios[key]).slice(0).filter(run => run.estado == true);
          this.domicilios = consulta;
          //debugger;
        }, error => {
          this.error = 'Tenemos algo de dificultades, disculpe las molestias. Error: ' + error.statusText;
          this.visible = true;
        });

    //this.tiempoInicio = (new Date()).getTime()
    let timer = Observable.timer(1000,1000);
    timer.subscribe(t => this.tickerFunc(t));
  }

  tickerFunc(tick){
    this.posiciones = [];

    this.domicilios.forEach(element => {
      if(element.terminado == false){
        let indice:number = this.lugaresService.buscarPosicionEnRecorrido(element,tick)
        //console.log("indice: " + indice)
        this.posiciones.push(element.markers[indice])
        element.posicion = element.markers[indice]
        if(indice == element.markers.length-1) {
          element.terminado = true
        }
      }
    });

   
    //this.ticks = tick
  }

}

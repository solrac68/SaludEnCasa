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
  markas:marker[] = []
  ahora:number = 0
  id:any = null
  zoom = 0
  //ticks = 0;

  constructor(private lugaresService:LugaresService, private _route: ActivatedRoute) {
  }

  ngOnInit(){
    this.lat = 6.25054
    this.lng = -75.56812

    this.id = this._route.snapshot.params['id'];
    
    if(this.id == 'entrega'){
      //Se cambia por que lo retornado es una promesa
      this.zoom = 15
      this.lugaresService.getDomiciliosDB()
              .valueChanges().subscribe((domicilios)=>{
              let consulta = Object.keys(domicilios).map(key => domicilios[key]).slice(0).filter(run => run.estado == true);
              this.domicilios = consulta;
              
              let fechaInicio:number = (new Date()).getTime()
              let fechaMaxima:number = 0
              this.domicilios.forEach(element => {
                element.dateInicio = fechaInicio

                element.dateEntrega = this.lugaresService.getfechaEntrega(element)
                if(element.dateEntrega > fechaMaxima){
                  fechaMaxima = element.dateEntrega
                }

                element.dateRetorno = this.lugaresService.getfechaRetorno(element)
              })
              
              let timer = Observable.timer(100,1000)
                          .take(Math.ceil((fechaMaxima-(new Date()).getTime())/1000) - 1)
              
              timer.subscribe(
                t => this.tickerFunc(t),
                err => this.errorFunc(err),
                () => this.completo()
              );

              
          }, error => {
            this.error = 'Tenemos algo de dificultades, disculpe las molestias. Error: ' + error.statusText;
            this.visible = true;
          });
    }
    else {
      this.zoom = 14
      this.lugaresService.getDomicilio(+this.id)
      .valueChanges().subscribe((domicilio)=>{
          this.domicilios = []
          this.posiciones = []
          this.domicilio = <IDomicilio>domicilio
          this.markas = this.domicilio.markers
          this.domicilio.dateInicio = (new Date()).getTime()
          this.domicilio.dateEntrega = this.lugaresService.getfechaEntrega(this.domicilio)
          this.domicilio.dateRetorno = this.lugaresService.getfechaRetorno(this.domicilio)
          this.domicilios.push(this.domicilio)
          // Se marka el principio y el final de la rura
          this.domicilio.markers[0].label = "Inicio"
          this.posiciones.push(this.domicilio.markers[0])
          this.domicilio.markers[this.domicilio.markers.length - 1].label = "Fin"
          this.posiciones.push(this.domicilio.markers[this.domicilio.markers.length - 1])
          this.ahora = (new Date()).getTime();

    }, error => {
      this.error = 'Tenemos algo de dificultades, disculpe las molestias. Error: ' + error.statusText;
      this.visible = true;
    });
      
    }
    

    
  }

  completo(){
    console.log('Completado: ');
    this.posiciones = [];
    this.domicilios.forEach(element => {
      let final = element.markers.length - 1
      this.posiciones.push(element.markers[final])
      //this.lugaresService.guardarDomicilio(element)
    });
  } // Fin de completo

  errorFunc(err){
    console.log('Error dibujo mapa: ' + err);
  } // Fin de errorFunc

  tickerFunc(tick){
    console.log('Tiempo: ' + tick);
    this.ahora = (new Date()).getTime();
    this.posiciones = [];

    this.domicilios.forEach(element => {
      if(element.terminado == false){
        let indice:number = this.lugaresService.buscarPosicionEnRecorrido(element,tick)
        element.markers[indice].label = element.id.toString()
        this.posiciones.push(element.markers[indice])
        element.posicion = element.markers[indice]
        if(indice == element.markers.length-1) {
          element.terminado = true
        }
      }
    });
  } // Fin de tickerFunc

}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LugaresService } from '../services/lugares.service';
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import { FormControl } from '@angular/forms';
import {Http} from "@angular/http";

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html'
})
export class CrearComponent {
  lugar:any = {};
  id:any = null;
  private searchField: FormControl;
  results$: Observable<any>;
  
  guardarLugar(){
    var direccion = this.lugar.calle + ',' + this.lugar.ciudad + ',' + this.lugar.pais;
    // Regresa una promesa
    this.lugaresService.obtenerGeodata(direccion)
      .subscribe((result) => {
        //debugger;
        this.lugar.lat = result.json().results[0].geometry.location.lat;
        this.lugar.lng = result.json().results[0].geometry.location.lng;
        
        if(this.id != 'new'){
          this.lugaresService.actualizarLugar(this.lugar);
          alert('Editado con éxito');
        }
        else{
          this.lugar.id = Date.now(); // Para generar un id diferente cada vez ... 
          this.lugaresService.guardarLugar(this.lugar)
          //.subscribe((r)=>console.log(r), (e)=>console.log(e));
          alert('Negocio guardado con éxito');
        }
        
        this.lugar = {};
      })
    
  }

  seleccionarDireccion(direccion){
    console.log(direccion);
    this.lugar.calle = direccion.address_components[1].long_name+' '+direccion.address_components[0].long_name;
    this.lugar.ciudad = direccion.address_components[4].long_name;
    this.lugar.pais = direccion.address_components[6].long_name;
  }

  constructor(private lugaresService:LugaresService,private route:ActivatedRoute, private http: Http){
    this.id = route.snapshot.params['id'];

    if(this.id != 'new'){
      lugaresService.buscarLugar(this.id)
        .valueChanges().subscribe((lugar)=>{
          // debugger;
          this.lugar = lugar;
    });
    }
    const URL = 'https://maps.google.com/maps/api/geocode/json';
    this.searchField = new FormControl();
    this.results$ = this.searchField.valueChanges
      .debounceTime(500)
      .switchMap(query => this.http.get(`${URL}?address=${query}`))
      .map(response => response.json())
      .map(response => response.results);
  }
}

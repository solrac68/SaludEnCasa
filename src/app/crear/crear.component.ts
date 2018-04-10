import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LugaresService } from '../services/lugares.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html'
})
export class CrearComponent {
  lugar:any = {};
  id:any = null;

  
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
          this.lugaresService.guardarLugar(this.lugar);
          alert('Negocio guardado con éxito');
        }
        
        this.lugar = {};
      })
    
  }

  constructor(private lugaresService:LugaresService,private route:ActivatedRoute){
    this.id = route.snapshot.params['id'];

    if(this.id != 'new'){
      lugaresService.buscarLugar(this.id)
        .valueChanges().subscribe((lugar)=>{
        this.lugar = lugar;
    });
    }
  }
}

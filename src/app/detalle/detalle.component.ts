import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LugaresService } from '../services/lugares.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent {

  id = null;
  lugar:any = null;
  constructor(private route:ActivatedRoute,private lugaresService:LugaresService) {
    //debugger
    console.log(route.snapshot.params['id'])
    console.log(route.snapshot.queryParams['accion'])
    console.log(route.snapshot.queryParams['referencia'])
    this.id = route.snapshot.params['id'];

    //this.lugar = lugaresService.buscarLugar(this.id);

    lugaresService.buscarLugar(this.id)
      .valueChanges().subscribe((lugar)=>{
        //debugger
        this.lugar = lugar;
    });

  }
}

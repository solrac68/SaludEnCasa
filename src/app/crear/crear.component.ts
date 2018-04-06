import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LugaresService } from '../services/lugares.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html'
})
export class CrearComponent {
  lugar:any = {};
  
  guardarLugar(){
    this.lugaresService.guardarLugar(this.lugar);
  }

  constructor(private lugaresService:LugaresService){

  }
}

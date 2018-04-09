import { Component } from '@angular/core';
import { LugaresService } from '../services/lugares.service';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html'
})
export class LugaresComponent {

  title = 'PlatziSquares';
  
  lat:number = 6.1577835;
  lng:number = -75.616915;
  lugares = null

  constructor(private lugaresService:LugaresService) {
    //this.lugares = lugaresService.getLugares();
    //Se cambia por que lo retornado es una promesa
    lugaresService.getLugares()
          .valueChanges().subscribe((lugares)=>{
          //debugger;
          this.lugares = lugares;
        });
  }

}

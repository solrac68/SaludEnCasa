import { Component } from '@angular/core';
import { LugaresService } from '../services/lugares.service';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html'
})
export class LugaresComponent {

  title = 'PlatziSquares';
  
  // lat:number = 6.1577835;
  // lng:number = -75.616915;

  lat:number = 4.6563044;
  lng:number = -74.057352;

  
  lugares = null
  error:any = null
  visible:boolean = false

  constructor(private lugaresService:LugaresService) {
    //this.lugares = lugaresService.getLugares();
    
    //Se cambia por que lo retornado es una promesa
    lugaresService.getLugares()
          // Esta linea es cuando se utiliza en los servicios this.http.get ....No se utiliza valueChanges()
          //.subscribe((lugares)=>{
            .valueChanges().subscribe((lugares)=>{
          //this.lugares = lugares.json();
          this.lugares = lugares;
          //debugger;
          // Esta linea es cuando se utiliza en los servicios this.http.get ...
          //this.lugares = Object.keys(this.lugares).map((key)=>this.lugares[key])
        }, error => {
          this.error = 'Tenemos algo de dificultades, disculpe las molestias. Error: ' + error.statusText;
          this.visible = true;
        });
  }

}

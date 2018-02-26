import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PlatziSquares';
  a = 2;
  b = 3;
  listo = false;
  //nombre = '' -->> Así es en JavaScript
  nombre:string = '' // ASÍ ES EN typeScript
  apellido:string = ''

  constructor() {
    setTimeout(() => {
      this.listo = true;
    },3000)
  }

  hacerAlgo(){
    alert('Haciendo Algo')
  }
}

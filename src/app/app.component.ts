import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PlatziSquares';
  lugares:any = [
    {active:true, nombre:'Florería la gardenia'},
    {active:true, nombre:'Donas la pasadita'},
    {active:true, nombre:'Veterinaria la huellitas felices'},
    {active:false, nombre:'Sushi Suhiroll'},
    {active:true, nombre:'Holtel la Gracia'},
    {active:false, nombre:'Zapateria el clavo'}
  ];
  
  lat:number = 6.1577835;
  lng:number = -75.616915;

  constructor() {
  }

}

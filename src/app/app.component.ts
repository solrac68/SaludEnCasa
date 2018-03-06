import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PlatziSquares';
  lugares:any = [
    {plan:'pagado',cercania:1,distancia:1,active:true, nombre:'Florería la gardenia'},
    {plan:'gratuito',cercania:1,distancia:1.8,active:true, nombre:'Donas la pasadita'},
    {plan:'gratuito',cercania:2,distancia:5,active:true, nombre:'Veterinaria la huellitas felices'},
    {plan:'gratuito',cercania:3,distancia:10,active:false, nombre:'Sushi Suhiroll'},
    {plan:'pagado',cercania:3,distancia:35,active:true, nombre:'Holtel la Gracia'},
    {plan:'gratuito',cercania:3,distancia:120,active:false, nombre:'Zapateria el clavo'}
  ];

  personas:any = [
    {edad:25, nombre:'Juan Antonio'},
    {edad:18, nombre:'Elias Eduardo'},
    {edad:20, nombre:'Sebastian'},
    {edad:50, nombre:'Sushi Suhiroll'},
    {edad:45, nombre:'Alvaro'},
    {edad:23, nombre:'Gonzalo'}
  ];
  
  lat:number = 6.1577835;
  lng:number = -75.616915;

  constructor() {
  }

}

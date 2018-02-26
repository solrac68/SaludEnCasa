import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PlatziSquares';
  lugares:any = [
    {nombre:'Florería la gardenia'},
    {nombre:'Donas la pasadita'},
    {nombre:'Veterinaria la huellitas felices'},
    {nombre:'Florería la gardenia'},
    {nombre:'Donas la pasadita'},
    {nombre:'Veterinaria la huellitas felices'}
  ];

  constructor() {
  }

}

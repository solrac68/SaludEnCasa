import { Component, OnInit } from '@angular/core';
import { IDomicilio } from '../shared/domicilio.model';
import { marker } from '../shared/domicilio.model';
import { SAVED_DOMICILIOS }  from '../shared/domicilios';
import { LugaresService } from '../services/lugares.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {

  domicilios:IDomicilio[] = null

  constructor(private lugaresService:LugaresService,private router: Router) { }

  ngOnInit() {
    this.lugaresService.getDomiciliosDB()
          .valueChanges().subscribe((domicilios)=>{
          this.domicilios = Object.keys(domicilios).map(key => domicilios[key]).slice(0);
    });
  }

  entregar() {
    this.lugaresService.guardarDomicilios(this.domicilios)
    this.router.navigate(['/lugares/entrega']);
  }

}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutorizacionService } from '../services/autorizacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  log:any = {};
  constructor(private autorizacionService:AutorizacionService){
  }

  login(){
    this.autorizacionService.login(this.log.email,this.log.password);
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms'

import { AgmCoreModule } from '@agm/core';
import { ResaltarDirective } from './directives/resaltar.directive';
import { ContarClicksDirective } from './directives/contar-clicks.directive';
import { Routes, RouterModule } from '@angular/router';
import {DetalleComponent} from './detalle/detalle.component';
import {LugaresComponent} from './lugares/lugares.component';
import {ContactoComponent} from './contacto/contacto.component';
import { LugaresService } from './services/lugares.service';
import {CrearComponent} from './crear/crear.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HttpModule } from '@angular/http';
import { LinkifystrPipe } from './pipes/linkifystr.pipe';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { AutorizacionService } from './services/autorizacion.service';
import {MyGuard} from "./services/my-guard.service";

// export const firebaseConfig = {
//   apiKey: "AIzaSyCWXcmYv1YK7hmIvbjQuoCDotuUzD71ymU",
//   authDomain: "platzisquare-4e1ba.firebaseapp.com",
//   databaseURL: "https://platzisquare-4e1ba.firebaseio.com",
//   storageBucket: "platzisquare-4e1ba.appspot.com",
//   messagingSenderId: "1000175685850"
// };

export const firebaseConfig = {
  apiKey: "AIzaSyDQq68hSiFO8rZ5k4_SmC6zeeHpBY7Pe6Q",
  authDomain: "saludencasa-ce8a5.firebaseapp.com",
  databaseURL: "https://saludencasa-ce8a5.firebaseio.com",
  projectId: "saludencasa-ce8a5",
  storageBucket: "saludencasa-ce8a5.appspot.com",
  messagingSenderId: "888087128483"
};

const appRoutes:Routes = [
  {path:'', component: LugaresComponent},
  {path:'lugares', component: LugaresComponent},
  {path:'detalle/:id', component: DetalleComponent},
  {path:'contacto', component: ContactoComponent},
  {path:'crear/:id', component: CrearComponent, canActivate:[MyGuard]},
  {path:'login', component: LoginComponent},
  {path:'registro', component: RegistroComponent},
]


@NgModule({
  declarations: [
    AppComponent,
    ResaltarDirective,
    ContarClicksDirective,
    DetalleComponent,
    LugaresComponent,
    ContactoComponent,
    CrearComponent,
    LinkifystrPipe,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDdNAZdMByjs7ysJtrnacOvuu2w8GSEbk4'
    }),
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule
  ],
  providers: [LugaresService,AutorizacionService, MyGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AgmCoreModule } from '@agm/core';
import { ResaltarDirective } from './directives/resaltar.directive';
import { ContarClicksDirective } from './directives/contar-clicks.directive';
import { Routes, RouterModule } from '@angular/router';
import { LugaresService } from './services/lugares.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HttpModule } from '@angular/http';
import { LinkifystrPipe } from './pipes/linkifystr.pipe';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { AutorizacionService } from './services/autorizacion.service';
import {MyGuard} from "./services/my-guard.service";
import {ProductoComponent} from './producto/producto.component';
import {ProductoListComponent} from './producto/producto-list.component';
import { ProductService } from './services/producto.services';
import { UsuariosService } from './services/usuarios.service';
import { UsuariosListComponent } from './registro/registro-userlist.component';
import { MessagingService } from './services/messaging.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CheckoutComponent} from './checkout/checkout.component';
import {ProductosComponent} from './admin/Productos.component';
import {CrearComponent} from './crear/crear.component';
import {LugaresComponent} from './lugares/lugares.component';
import {ActivityListComponent} from './activity-list/activity-list.component';
import { RegistroComponentRetorno } from './registro/registro.componentretorno';


export const firebaseConfig = {
  apiKey: "AIzaSyDQq68hSiFO8rZ5k4_SmC6zeeHpBY7Pe6Q",
  authDomain: "saludencasa-ce8a5.firebaseapp.com",
  databaseURL: "https://saludencasa-ce8a5.firebaseio.com",
  projectId: "saludencasa-ce8a5",
  storageBucket: "saludencasa-ce8a5.appspot.com",
  messagingSenderId: "888087128483"
};

const appRoutes:Routes = [
  {path:'', component: ProductoListComponent},
  {path:'login', component: LoginComponent},
  {path:'registro', component: RegistroComponent},
  {path:'producto', component: ProductoComponent},
  {path:'comprar', component: ProductoListComponent},
  {path:'usuarios', component: UsuariosListComponent},
  {path:'checkout', component: CheckoutComponent},
  {path:'listaProductos', component: ProductosComponent},
  {path:'crear/:id', component: CrearComponent},
  {path:'lugares/:id', component: LugaresComponent},
  {path:'domicilios', component: ActivityListComponent},
  {path:'registroRetorno/:id', component: RegistroComponentRetorno},
]


@NgModule({
  declarations: [
    AppComponent,
    ResaltarDirective,
    ContarClicksDirective,
    LinkifystrPipe,
    LoginComponent,
    RegistroComponent,
    ProductoComponent,
    ProductoListComponent,
    UsuariosListComponent,
    CheckoutComponent,
    ProductosComponent,
    CrearComponent,
    LugaresComponent,
    ActivityListComponent,
    RegistroComponentRetorno
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
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [LugaresService,AutorizacionService, MyGuard, ProductService, UsuariosService, MessagingService],
  bootstrap: [AppComponent]
})
export class AppModule { }

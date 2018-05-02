import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LugaresService } from '../services/lugares.service';
import { AutorizacionService } from '../services/autorizacion.service';
import { Compra } from '../Compra';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {

  email = null;
  lugar:any = null;
  numeroProductos:any = null;
  total_carrito:any = 0;
  productosEnCarrito:any= null;
  entrega:any = {};

  efectuaPago(){
    //debugger;
    this.entrega.id = Date.now();
    this.lugaresService.guardarEntrega(this.entrega);
    for(let compra of this.productosEnCarrito){
        compra.estado = 1;
        this.lugaresService.actualizarProductosEnCarrito(compra);
    }
    alert('Su compra se ha realizado con éxito');
    this.entrega = {};
  }

  constructor(private route:Router,private lugaresService:LugaresService,private autorizacionService:AutorizacionService) {

    this.autorizacionService.isLogged()
      .subscribe((result) => {
        if(result && result.uid){
          this.email = this.autorizacionService.getEmail();
          // NOTA: JAVASCRIPT ES UNA PORQUERÍA DE LENGUAJE PERDÍA VARIAS HORAS
          // HASTA QUE ME DI CUENTA QUE DEBÍA CAMBIAR UNA FUNCIÓN POR UNA ARROW FUNCTION ):
            lugaresService.obtenerProductosEnCarrito(this.email).on("value",(snapshot)=> {
              //debugger;
              let miscompras = snapshot.val();
              miscompras = Object.keys(miscompras).map((key)=>miscompras[key]);
              miscompras = miscompras.filter((obj) => {return obj.estado === 0});

              

              for(let obj of miscompras){
                this.total_carrito += obj.precio*obj.volumen;
              }
              this.productosEnCarrito = miscompras;
              this.numeroProductos = miscompras.length;
          }
        );
        }else{
          this.route.navigate(['']);
        }
      },(error) => {
        this.route.navigate(['']);
      })
  }
}
  


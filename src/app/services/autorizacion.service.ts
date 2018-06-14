import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import {Router} from "@angular/router";

@Injectable()
export class AutorizacionService{

    autorizado:Boolean = false;

    constructor (private angularFireAuth:AngularFireAuth, private router:Router) {
        this.isLogged()
    }
    public login = (email,password) => {
        this.angularFireAuth.auth.signInWithEmailAndPassword(email,password)
            .then((response)=>{
                //alert('Usuario Logeado con exito');
                console.log(response);
            })
            .catch((error) => {
                ///alert('Un error ha ocurrido')
                console.log(error);
            })
    }

    public registro = (email,password) => {
        this.angularFireAuth.auth.createUserWithEmailAndPassword(email,password)
            .then((response)=>{
                ///alert('Usuario registrado con exito');
                console.log(response);
            })
            .catch((error) => {
                //alert('Un error ha ocurrido')
                console.log(error);
            })
    }

    public isLogged(){
        return this.angularFireAuth.authState;
    }

    public logout(){
        this.angularFireAuth.auth.signOut();
    }

    public getEmail(){
        return this.angularFireAuth.auth.currentUser.email;
    }

    
}

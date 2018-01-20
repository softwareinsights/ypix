import { Storage } from '@ionic/storage';
import { RegisterPage } from './../register/register';
import { HomePage } from './../home/home';
import { AuthService } from './login.service';
import { LoginInterface } from './login.interface';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RecoverPage } from '../recover/recover';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  email:string;
  password:string;
  isLogged:  boolean;

  constructor(
    public navCtrl: NavController,
    protected service: AuthService, 
    private storage: Storage
    ) {
      if(this.storage.get("isLoggetIn")){
        // this.navCtrl.push(HomePage);
      }
  }

  registro(): void {
     this.navCtrl.push(RegisterPage);
  }

  olvide(): void {
    this.navCtrl.push(RecoverPage);
 }

  onSubmit(): void {
    const values: LoginInterface = {
      'email': this.email,
      'password': this.password
    }
    this.service.login(values)
      .subscribe(
          (response: any) => {
              this.isLogged = response
          },
          error => console.log(error),
          () => {

              if (this.isLogged) {
                alert("¡Te has logeado correctamente!");
                this.navCtrl.setRoot(HomePage)
                .then(data => console.log("data", data),
                  error  => console.log("error", error));
              } else {
                  alert('Acceso denegado');
              }

          });
  }

                   
}

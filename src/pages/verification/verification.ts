import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';

@Component({
  selector: 'page-verification',
  templateUrl: 'verification.html'
})
export class VerificationPage {

  constructor(public navCtrl: NavController) {

  }

  siguiente(){
    this.navCtrl.push(WelcomePage);
  }
  
  volver(){
    this.navCtrl.pop();
  }

}

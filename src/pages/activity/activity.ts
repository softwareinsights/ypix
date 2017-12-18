import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VerificationPage } from '../verification/verification';

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html'
})
export class ActivityPage {

  constructor(public navCtrl: NavController) {

  }
  siguiente(){
    this.navCtrl.push(VerificationPage);
  }
  
  volver(){
    this.navCtrl.pop();
  }
}

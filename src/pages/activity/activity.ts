import { ActivityInterface } from './activity.interface';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VerificationPage } from '../verification/verification';


@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html'
})
export class ActivityPage {

  activities: ActivityInterface;

  constructor(public navCtrl: NavController) {

  }
  siguiente(){
    console.log("activities", this.activities);
    this.navCtrl.push(VerificationPage);
  }
  
  volver(){
    this.navCtrl.pop();
  }
}

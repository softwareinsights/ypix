import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ComplatePage } from '../complate/complate';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  }

  completar(){
    this.navCtrl.push(ComplatePage);
  }
  
  siguiente(){
    this.navCtrl.push(HomePage);
 }
}
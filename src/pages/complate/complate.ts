import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-complate',
  templateUrl: 'complate.html'
})
export class ComplatePage {

  constructor(public navCtrl: NavController) {

  }
  volver(){
    this.navCtrl.pop();
  }
}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VerificationPage } from '../verification/verification';
import { Storage } from '@ionic/storage';
import { StartPage } from '../start/start';

export interface ActidadesInterface {
  futbol: boolean;
  basquetball: boolean;
  correr: boolean;
  cantar: boolean;
  nadar: boolean;
  bicicleta: boolean;
  guitarra: boolean;
}

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html'
})
export class ActivityPage {

  futbol: boolean;
  basquetball: boolean;
  correr: boolean;
  cantar: boolean;
  nadar: boolean;
  bicicleta: boolean;
  guitarra: boolean;

  constructor(public navCtrl: NavController, public storage:Storage) {

  }

  siguiente(){
      const actividades: ActidadesInterface  ={
        futbol: (!this.futbol) ? false : true,
        basquetball: (!this.basquetball) ? false : true,
        correr: (!this.correr) ? false : true,
        cantar: (!this.cantar) ? false : true,
        nadar: (!this.nadar) ? false : true,
        bicicleta: (!this.bicicleta) ? false : true,
        guitarra: (!this.guitarra) ? false : true,
      }

      this.storage.set("Actividades", actividades);
      console.log("actividades", actividades);
      this.navCtrl.push(StartPage);
  }
  
  volver(){
      this.navCtrl.pop();
  }
}

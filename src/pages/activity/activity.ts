import { StartPage } from './../start/start';
import { Storage } from '@ionic/storage';
import { ActivityService } from './activity.service';
import { ActivityInterface } from './activity.interface';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VerificationPage } from '../verification/verification';

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html'
})
export class ActivityPage implements OnInit {

  actividades: ActivityInterface[];
  activities: any;

  constructor(
    public navCtrl: NavController, 
    private activityService: ActivityService,
    private storage: Storage) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.activityService.getAll()
    .subscribe((result) => {
      this.actividades = result;
    })
  }

  guardar(){

    let nuevoArreglo = [];
    this.actividades.forEach(actividad => {
      if (actividad.visible) {
        nuevoArreglo.push(actividad.nombre);
      }
      
    });

   // console.log("nuevoArreglo", nuevoArreglo);

    this.storage.set('Actividades', nuevoArreglo);
    alert('Actividades Actualizadas con exito');
  }
  
  volver(){
    alert('Volver atras');
    //this.navCtrl.pop();
  }
}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VerificationPage } from '../verification/verification';
import { ActivityService } from './activity.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ActivityInterface } from './activity.interface';
import { Storage } from '@ionic/storage/es2015/storage';

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

    console.log("nuevoArreglo", nuevoArreglo);

    this.storage.set('Actividades', nuevoArreglo);
  }
  
  volver(){
    this.navCtrl.pop();
  }
}

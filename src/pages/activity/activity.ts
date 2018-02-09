import { StartPage } from './../start/start';
import { Storage } from '@ionic/storage';
import { ActivityService } from './activity.service';
import { ActivityInterface } from './activity.interface';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';



@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html'
})
export class ActivityPage implements OnInit{

  actividades: ActivityInterface[];
  activities: any;

  constructor(public navCtrl: NavController, private service: ActivityService, private storage: Storage) {
  }
  ngOnInit(){
    this.service.all()
      .subscribe(result => {
        this.actividades = result;
      });
  }
  
  siguiente(){
    console.log("Actividades", this.actividades);
    console.log("activities", this.activities);
    this.storage.set("Actividades", this.actividades)
  }
  
  volver(){
    this.navCtrl.pop();
  }
}

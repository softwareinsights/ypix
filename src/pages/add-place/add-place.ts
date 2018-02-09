import { ActivityInterface } from './../activity/activity.interface';
import { ActivityService } from './../activity/activity.service';
import { PlaceInterface } from './place.interface';
import { AuthService } from './../login/login.service';
import { LoginPage } from './../login/login';
import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ModalController, LoadingController, ToastController, NavController } from "ionic-angular";
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { File, Entry, FileError } from '@ionic-native/file';

import { SetLocationPage } from "../set-location/set-location";
import { Location } from "../../models/location";
import { PlacesService } from "../../services/places";

declare var cordova: any;

@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html'
})
export class AddPlacePage implements OnInit {
  location: Location = {
    lat: 19.692359099999997, 
    lng: -103.4566299
  };
  locationIsSet = false;
  imageUrl = '';
  actividades: ActivityInterface[];
  activities: any;

  constructor(private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private placesService: PlacesService,
              private geolocation: Geolocation,
              private camera: Camera,
              private file: File,
              private authService: AuthService,
              private navCtrl: NavController,
              private activityService: ActivityService
              ) {
  }
  ngOnInit(){
    this.activityService.all()
      .subscribe(result => {
        this.actividades = result;
      });
  }

  ionViewCanEnter(): boolean{
   if(this.authService.isLoggedIn){
      return true;
    } else {
      this.presentToast("Acceso restringido a usuarios logeados");
      return false;
    }
  }

  presentToast(text: string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  onSubmit(form: NgForm) {

    const placevalue: PlaceInterface = {
      "title": form.value.title, 
      "description": form.value.description, 
      "location": this.location, 
      "imageUrl": this.imageUrl,
      "actividads": this.actividades
    }

    this.placesService.create(placevalue)
      .subscribe(
          (response: any) => {
            if(response.id !== undefined) {
              alert("¡Has creado tu lugar correctamente!");

                // http://localhost:3000/api/Places/5a7cecadf547b03468e1f936/actividads/rel/5a7cecf5f547b03468e1f937
                console.log(this.activities);
                console.log(this.actividades);

            } 
          });

    form.reset();
    this.location = {
      lat: 19.692359099999997, 
      lng: -103.4566299
    };
    this.imageUrl = '';
    this.locationIsSet = false;
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage,
      {location: this.location, isSet: this.locationIsSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          this.location = data.location;
          this.locationIsSet = true;
        }
      }
    );
  }

  onLocate() {
    const loader = this.loadingCtrl.create({
      content: 'Ubicando tu posición...'
    });
    loader.present();
    this.geolocation.getCurrentPosition()
      .then(
        location => {
          loader.dismiss();
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
          this.locationIsSet = true;
        }
      )
      .catch(
        error => {
          loader.dismiss();
          const toast = this.toastCtrl.create({
            message: 'No pudimos tomar tu posición, porfavor ingresala manualmente!',
            duration: 2500
          });
          toast.present();
        }
      );
  }
  

  /*
  onTakePhoto() {
    this.camera.getPicture({
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true
    })
      .then(
        imageData => {
          const currentName = imageData.replace(/^.*[\\\/]/, '');
          const path = imageData.replace(/[^\/]*$/, '');
          const newFileName = new Date().getUTCMilliseconds() + '.jpg';
          this.file.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
            .then(
              (data: Entry) => {
                this.imageUrl = data.nativeURL;
                this.camera.cleanup();
                this.file.removeFile(path, currentName);
              }
            )
            .catch(
              (err: FileError) => {
                this.imageUrl = '';
                const toast = this.toastCtrl.create({
                  message: 'No pudo ser tomada la imagen. Porfavor intenta nuevamente.',
                  duration: 2500
                });
                toast.present();
                this.camera.cleanup();
              }
            );
          this.imageUrl = imageData;
        }
      )
      .catch(
        err => {
          const toast = this.toastCtrl.create({
            message: 'No pudo ser tomada la imagen. Porfavor intenta nuevamente.',
            duration: 2500
          });
          toast.present();
        }
      );
  }
  */
}

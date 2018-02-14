import { PlaceInterface } from './place.interface';
import { AuthService } from './../login/login.service';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ModalController, LoadingController, ToastController, NavController } from "ionic-angular";
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { File, Entry, FileError } from '@ionic-native/file';

import { SetLocationPage } from "../set-location/set-location";
import { Location } from "../../models/location";
import { PlacesService } from "../../services/places";
import { ActivityService } from '../activity/activity.service';
import { ActivityInterface } from '../activity/activity.interface';

declare var cordova: any;

@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html'
})
export class AddPlacePage {

  actividades: any;
  public: boolean;
  cost: number;
  direccion: string;
  horarios: string;


  location: Location = {
    lat: 40.7624324,
    lng: -73.9759827
  };
  locationIsSet = false;
  imageUrl = '';

  constructor(private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private placesService: PlacesService,
              private geolocation: Geolocation,
              private camera: Camera,
              private file: File,
              private authService: AuthService,
              private navCtrl: NavController,
              private activityService: ActivityService) {
  }
  ngOnInit() {
    this.getAllActivities();
  }

  getAllActivities() {
    this.activityService.getAll()
    .subscribe((result) => {
      this.actividades = result;
    })
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

    let nuevoArreglo = [];

    this.actividades.forEach(actividad => {

      if (actividad.visible) {
        nuevoArreglo.push(actividad.nombre);
      }
      
    });

    const placevalue: PlaceInterface = {
      "title": form.value.title, 
      "description": form.value.description, 
      "location": this.location, 
      "imageUrl": this.imageUrl,
      "activities": nuevoArreglo,
      "public": form.value.public,
      "cost": form.value.cost,
      "direccion": form.value.direccion,
      "horarios": form.value.horarios
    }
    console.log("placevalue", placevalue);

    this.placesService.create(placevalue)
      .subscribe(
          (response: any) => {
            if(response.id !== undefined) {
              alert("¡Has creado tu lugar correctamente!");
            } 
          });

    form.reset();
    this.location = {
      lat: 40.7624324,
      lng: -73.9759827
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
}

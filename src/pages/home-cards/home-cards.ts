import { Storage } from '@ionic/storage';
import { LocationInterface } from './../add-place/location.interface';
import { ToastController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
import { PlaceInterface } from './../add-place/place.interface';
import { Location } from './../../models/location';
import { Component, OnInit } from '@angular/core';

import { ModalController } from 'ionic-angular';
import { AddPlacePage } from "../add-place/add-place";
import { Place } from "../../models/place";
import { PlacesService } from "../../services/places";
import { PlacePage } from "../place/place";

@Component({
  selector: 'page-home',
  templateUrl: 'home-cards.html'
})
export class HomeCardsPage implements OnInit {
  addPlacePage = AddPlacePage;
  // places: Place[] = [];
  places: PlaceInterface[] = [];
  locationIsSet: boolean;

  // location: Location = {lat: 19.692359099999997, lng: -103.4566299};
  location: LocationInterface = {
    lat: 40.7624324,
    lng: -73.9759827
  };

  constructor(private platform: Platform,
              private modalCtrl: ModalController,
              private placesService: PlacesService,
              private loadingCtrl: LoadingController,
              private geolocation: Geolocation,
              private toastCtrl: ToastController,
              private storage: Storage) {
      this.locationIsSet = false;
      platform.ready().then(() => {

        this.storage.get('lat').then(
            latitude => {
            if (latitude !== null)  {

                this.storage.get('lng').then(
                  longitude => {
                  if (longitude !== null)  {
                    this.location.lng = longitude;
                    this.location.lat = latitude;
                    this.locationIsSet = true;

                    } else {
                      this.locate();
                    } 
                  }
                );
              } else {
                this.locate();
              } 
            }
          );
          
      });
  }

  ngOnInit() { 

    this.placesService.fetchPlaces()
      .subscribe(
        (places: PlaceInterface[]) => this.places = places
      );
 
   }

  locate() {
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

          this.storage.set('lat', location.coords.latitude);
          this.storage.set('lng', location.coords.longitude);

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


  ionViewWillEnter() {
    /*
    this.placesService.loadPlaces()
    .subscribe(result => {
      this.places = result;
    });
    */
  }

  onOpenPlace(place: Place, index: number) {
    const modal = this.modalCtrl.create(PlacePage, {place: place, index: index});
    modal.present();
    modal.onDidDismiss(
      () => {
        this.placesService.loadPlaces()
          .subscribe(result => {
            this.places = result;
          });
      }
    );
  }

}
import { PlaceInterface } from './../pages/add-place/place.interface';
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { File } from "@ionic-native/file";
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';

import { Place } from "../models/place";
import { Location } from "../models/location";
import { Configuration } from './../app/app.constants';

declare var cordova: any;

@Injectable()
export class PlacesService {
  private places: Place[] = [];

  private headers: Headers;
  private actionUrl: string;

  constructor(
        private storage: Storage, 
        private file: File,
        private _http: Http, 
        private _configuration: Configuration
        ) {
          this.headers = new Headers();
          this.headers.append('Content-Type', 'application/json; charset=UTF-8');
        }


  create(values: PlaceInterface): Observable<any> {
      this.actionUrl = `${this._configuration.ServerWithApiUrl}Places`;
      const toAdd = JSON.stringify(values);
      return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
          .map((response: Response) => <any>response.json())
          .catch(this.handleError);
  }

  private handleError(error: Response) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }


  addPlace(title: string,
           description: string,
           location: Location,
           imageUrl: string) {
    const place = new Place(title, description, location, imageUrl);
    this.places.push(place);
    this.storage.set('places', this.places)
      .then()
      .catch(
        err => {
          this.places.splice(this.places.indexOf(place), 1);
        }
      );
  }

  loadPlaces() {
    return this.places.slice();
  }

  fetchPlaces() {
    return this.storage.get('places')
      .then(
        (places: Place[]) => {
          this.places = places != null ? places : [];
          return this.places;
        }
      )
      .catch(
        err => console.log(err)
      );
  }

  deletePlace(index: number) {
    const place = this.places[index];
    this.places.splice(index, 1);
    this.storage.set('places', this.places)
      .then(
        () => {
          this.removeFile(place);
        }
      )
      .catch(
        err => console.log(err)
      );
  }

  private removeFile(place: Place) {
    const currentName = place.imageUrl.replace(/^.*[\\\/]/, '');
    this.file.removeFile(cordova.file.dataDirectory, currentName)
      .then(
        () => console.log('Removed File')
      )
      .catch(
        () => {
          console.log('Error while removing File');
          this.addPlace(place.title, place.description, place.location, place.imageUrl);
        }
      );
  }
}

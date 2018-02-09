import { PlaceInterface } from './../pages/add-place/place.interface';
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { File } from "@ionic-native/file";
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';

import { Place } from "../models/place";
import { Location } from "../models/location";
import { Configuration } from './../app/app.constants';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

declare var cordova: any;

@Injectable()
export class PlacesService {
  // private places: Place[] = [];
  private places: PlaceInterface[] = [];

  private storage_places: any[] = [];
  
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

  loadPlaces(): Observable<PlaceInterface[]>  {
      this.actionUrl = `${this._configuration.ServerWithApiUrl}Places`;
      return this._http.get(this.actionUrl, { headers: this.headers })
          .map((response: Response) => <PlaceInterface>response.json())
          .catch(this.handleError);
  }


  fetchPlaces(): Observable<PlaceInterface[]> {

      this.actionUrl = `${this._configuration.ServerWithApiUrl}Places`;
      return this._http.get(this.actionUrl, { headers: this.headers })
          .map((response: Response) => <PlaceInterface>response.json())
          .catch(this.handleError)
          .do((places: PlaceInterface[]) => {


              // recuperar lo de Storage
              this.storage.get("Actividades")
                .then(result => {
                  this.storage_places = result;


                  console.log("this.storage_places", this.storage_places);
                  console.log("places", places);

                  // continuar validado todos los lugares con cada lugar de storage
                  let nuevoPlaces = [];

                  let actividadesPorLugar = [];

                  // barrer places, todos los lugares
                  places.forEach(lugar => {


                    console.log("lugar", lugar);

                    // actividades por cada lugar
                    let i = 0;             
                    lugar.actividads.forEach(actividadporlugar => {
                      actividadesPorLugar[i] = actividadporlugar.id;
                      i++;
                    });


                    console.log("actividadesPorLugar", actividadesPorLugar);

                    // comparación y validación con lo que tenemos en localstorage
                    actividadesPorLugar.forEach(actividadporlugar => {

                      
                        console.log("this.storage_places.indexOf(actividadporlugar)", this.storage_places.indexOf(actividadporlugar));

                        if (this.storage_places.indexOf(actividadporlugar) > -1) {
                          // guardar en un nuevo arreglo
                          nuevoPlaces.push(lugar);

                        }
                        
                    });
 

                  });

                  this.places = nuevoPlaces;
                });
                 

              this.places = places != null ? places : [];
          });
  }

  deletePlace(index: number): Observable<any> {

    const place = this.places[index];

    this.actionUrl = `${this._configuration.ServerWithApiUrl}Places/${place.id}`;

    return this._http.delete(this.actionUrl, { headers: this.headers })
        .map((response: Response) => <any>response.json())
        .catch(this.handleError)
        .do((response) => {
          
          console.log("response", response);
          console.log("place en do", place);
          this.removeFile(place)
        });
  }

  private removeFile(place: Place) {
    const currentName = place.imageUrl.replace(/^.*[\\\/]/, '');
    this.file.removeFile(cordova.file.dataDirectory, currentName)
      .then(
        () => console.log('Archivo Removido')
      )
      .catch(
        () => {
          console.log('Error mientras se eliminaba este archivo');

          const placevalue: PlaceInterface = {
            "title": place.title, 
            "description": place.description, 
            "location": place.location, 
            "imageUrl": place.imageUrl
          }

          this.create(placevalue)
            .subscribe(
                (response: any) => console.log("Se ha recuperado el lugar"));
                
        }
      );
  }

  private handleError(error: Response) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }

}

import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Configuration } from './../../app/app.constants';
import { ActivityInterface } from './activity.interface';


@Injectable()
export class ActivityService {
    private actionUrl: string;
    private headers: Headers;
    endpoint: string;
    actividades: ActivityInterface[];

    constructor(
        private _http: Http, 
        private _configuration: Configuration,
        private storage: Storage) {

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');

            this.endpoint = `${this._configuration.ServerWithApiUrl}/Actividades`;

    }

    getAll(): Observable<ActivityInterface[]> {
        return this._http.get(this.endpoint, {headers: this.headers})
        .map((result: Response) => <ActivityInterface[]>result.json())
        .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    


}
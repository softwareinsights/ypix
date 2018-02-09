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

    constructor(
        private _http: Http, 
        private _configuration: Configuration,
        private storage: Storage) {

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');
    }

    all(): Observable<ActivityInterface[]>  {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}Actividades`;
        return this._http.get(this.actionUrl, { headers: this.headers })
            .map((response: Response) => <ActivityInterface>response.json())
            .catch(this.handleError);
    }

    
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }




}
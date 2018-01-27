import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Configuration } from './../../app/app.constants';
import { LoginInterface } from './login.interface';


@Injectable()
export class AuthService {
    
    userName: string;
    isLoggedIn: boolean;
    
    // store the URL so we can redirect after logging in
    redirectUrl: string;

    private actionUrl: string;
    private headers: Headers;

    constructor(
        private _http: Http, 
        private _configuration: Configuration,
        private storage: Storage) {

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');

        this.userName = '';
        this.isLoggedIn = false;
    }

    login(values: LoginInterface): Observable<any> {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}usuarios/login`;
        const toAdd = JSON.stringify(values);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <any>response.json())
            .map((response: any) => {
                if(response.id !== undefined) {
                    this.isLoggedIn = true;
                    this.storage.set('isLoggedIn', true); 
                    this.storage.set('token', response.id); 
                } else {
                    this.isLoggedIn = false;
                }
                return this.isLoggedIn;
            })
            .catch((error) => this.handleError(error));
    }

    logout(): void {
        this.isLoggedIn = false;
        this.storage.set('isLoggedIn', false);
        this.storage.set('token', '');
    }

    private handleError(error: Response) {
        if(error.json().error.code === 'LOGIN_FAILED') {
            alert('Credenciales incorrectas.');
        }
        return Observable.throw(this.isLoggedIn);

    }


}
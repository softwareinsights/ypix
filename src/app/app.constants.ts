import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {

  // Server: string = 'http://sportclubapisoftinsi.herokuapp.com/';
  Server: string = 'http://localhost:3000/';
  ApiUrl: string = 'api/';
  ServerWithApiUrl = this.Server + this.ApiUrl;

}

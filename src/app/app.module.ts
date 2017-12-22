import { StartPage } from './../pages/start/start';
import { HomeCardsPage } from './../pages/home-cards/home-cards';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from "@ionic/storage";
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { File } from '@ionic-native/file';
import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddPlacePage } from "../pages/add-place/add-place";
import { PlacePage } from "../pages/place/place";
import { SetLocationPage } from "../pages/set-location/set-location";
import { AgmCoreModule } from "angular2-google-maps/core";
import { PlacesService } from "../services/places";

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { WelcomePage } from '../pages/welcome/welcome';
import { ComplatePage } from '../pages/complate/complate';
import { VerificationPage } from '../pages/verification/verification';
import { ActivityPage } from '../pages/activity/activity';
import { RecoverPage } from '../pages/recover/recover';
import { RecoverymailPage } from '../pages/recoverymail/recoverymail';
import { Configuration } from './app.constants';
import { AuthService } from '../pages/login/login.service';
import { RegisterService } from '../pages/register/register.service';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPlacePage,
    SetLocationPage, 
    LoginPage,
    RegisterPage,
    WelcomePage,
    ComplatePage,
    VerificationPage,
    ActivityPage,
    RecoverPage,
    RecoverymailPage,
    PlacePage,
    HomeCardsPage,
    StartPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAgdv3BULjX0nTwSiCFF48sBZxqhyEb-zA'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPlacePage,
    SetLocationPage,
    LoginPage,
    RegisterPage,
    WelcomePage,
    ComplatePage,
    VerificationPage,
    ActivityPage,
    RecoverPage,
    RecoverymailPage,
    PlacePage,
    HomeCardsPage,
    StartPage
  ],
  providers: [
    File,
    Camera,
    Geolocation,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PlacesService,
    Configuration,
    Camera,AndroidPermissions,
    RegisterService,
    AuthService
  ]
})
export class AppModule {
}


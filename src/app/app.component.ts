import { ActivityPage } from './../pages/activity/activity';
import { ToastController } from 'ionic-angular';
import { AuthService } from './../pages/login/login.service';
import { WelcomePage } from './../pages/welcome/welcome';
import { VerificationPage } from './../pages/verification/verification';
import { RecoverymailPage } from './../pages/recoverymail/recoverymail';
import { RecoverPage } from './../pages/recover/recover';
import { ComplatePage } from './../pages/complate/complate';
import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = HomePage;
  pages: Array<{title: string, component: any}>;


  constructor(
      public menu: MenuController,
      platform: Platform,
      statusBar: StatusBar,
      splashScreen: SplashScreen,
      private authService: AuthService,
      private toastCtrl: ToastController
    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
          // set our app's pages
    });
      this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Login', component: LoginPage },
      { title: 'Register', component: RegisterPage },
      { title: 'Actividades', component: ActivityPage },
      { title: 'Completa tus datos', component: ComplatePage },
      { title: 'Recover', component: RecoverPage },
      { title: 'Recoverymail', component: RecoverymailPage },
      { title: 'Verificación', component: VerificationPage },
      { title: 'Welcome', component: WelcomePage },
      { title: 'Agrega un Lugar', component: HomePage }
    ];
  }

  presentToast(text: string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  closeSession() {
    this.presentToast("Sesión cerrada correctamente");
    // close the menu when clicking a link from the menu
    this.menu.close();
    this.authService.logout();
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

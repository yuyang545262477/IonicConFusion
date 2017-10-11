import {Component, Inject, ViewChild} from "@angular/core";
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {ModalController, Nav, Platform} from 'ionic-angular';
import {AboutPage} from "../pages/about/about";
import {ContactPage} from "../pages/contact/contact";
import {FavoritesPage} from "../pages/favorites/favorites";

import {HomePage} from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {MenuPage} from "../pages/menu/menu";
import {ReservationPage} from "../pages/reservation/reservation";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = MenuPage;
  pages: Array<{ title: string, icon: string, component: any }>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public modalCtrl: ModalController,
              @Inject('BaseURL') private _baseUrl) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Home', icon: 'home', component: HomePage},
      {title: 'About Us', icon: 'information-circle', component: AboutPage},
      {title: 'Menu', icon: 'list-box', component: MenuPage},
      {title: 'Contact Us', icon: 'contact', component: ContactPage},
      {title: 'My Favorites', icon: 'heart', component: FavoritesPage},
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openReserve() {
    let modal = this.modalCtrl.create(ReservationPage);
    modal.present();
  }

  openLogin() {
    let model = this.modalCtrl.create(LoginPage);
    model.present();
  }
}

import {ErrorHandler, NgModule} from '@angular/core';
import {HttpModule} from "@angular/http";
import {BrowserModule} from '@angular/platform-browser';
import {CallNumber} from "@ionic-native/call-number";
import {Camera} from "@ionic-native/camera";
import {LocalNotifications} from '@ionic-native/local-notifications';
import {Network} from "@ionic-native/network";
import {SocialSharing} from "@ionic-native/social-sharing";
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {IonicStorageModule} from "@ionic/storage";
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';


import {AboutPage} from "../pages/about/about";
import {CommentPage} from "../pages/comment/comment";
import {ContactPage} from "../pages/contact/contact";
import {DishdetailPage} from "../pages/dishdetail/dishdetail";
import {FavoritesPage} from "../pages/favorites/favorites";
import {HomePage} from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {MenuPage} from "../pages/menu/menu";
import {RegisterPage} from "../pages/register/register";
import {ReservationPage} from "../pages/reservation/reservation";

import {DishProvider} from '../providers/dish/dish';
import {FavoriteProvider} from '../providers/favorite/favorite';
import {LeaderProvider} from '../providers/leader/leader';
import {ProcessHttpmsgProvider} from '../providers/process-httpmsg/process-httpmsg';
import {PromotionProvider} from '../providers/promotion/promotion';
import {baseURL} from "../shared/baseurl";
import {MyApp} from './app.component';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    MenuPage,
    ContactPage,
    FavoritesPage,
    DishdetailPage,
    ReservationPage,
    CommentPage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    MenuPage,
    ContactPage,
    FavoritesPage,
    DishdetailPage,
    ReservationPage,
    CommentPage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    DishProvider,
    LeaderProvider,
    PromotionProvider,
    ProcessHttpmsgProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: 'BaseURL', useValue: baseURL},
    FavoriteProvider,
    SocialSharing,
    Network,
    Camera,
    CallNumber
  ]
})
export class AppModule {
}

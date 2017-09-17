import {ErrorHandler, NgModule} from '@angular/core';
import {HttpModule} from "@angular/http";
import {BrowserModule} from '@angular/platform-browser';
import {SplashScreen} from '@ionic-native/splash-screen';

import {StatusBar} from '@ionic-native/status-bar';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {AboutPage} from "../pages/about/about";
import {ContactPage} from "../pages/contact/contact";
import {DishdetailPage} from "../pages/dishdetail/dishdetail";
import {HomePage} from '../pages/home/home';
import {MenuPage} from "../pages/menu/menu";
import {DishProvider} from '../providers/dish/dish';
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
    DishdetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    MenuPage,
    ContactPage,
    DishdetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DishProvider,
    LeaderProvider,
    PromotionProvider,
    ProcessHttpmsgProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: 'BaseURL', useValue: baseURL}
  ]
})
export class AppModule {
}

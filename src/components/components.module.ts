import {NgModule} from '@angular/core';
import {IonicModule} from "ionic-angular";
import {GlobalBodyComponent} from './global-body/global-body';

@NgModule({
  declarations: [
    GlobalBodyComponent],
  imports: [IonicModule],
  exports: [
    GlobalBodyComponent]
})
export class ComponentsModule {
}

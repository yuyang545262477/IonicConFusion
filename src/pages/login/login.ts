///<reference path="../../../node_modules/@ionic/storage/es2015/storage.d.ts"/>
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Storage} from "@ionic/storage";
import {ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {User} from "../../shared/user";
import {RegisterPage} from "../register/register";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  user: User = {username: '', password: ''};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _viewCtrl: ViewController,
              private modalCtrl: ModalController,
              private _formBuilder: FormBuilder,
              private _storage: Storage) {
    //    create reactive form
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
    _storage.get('user')
      .then(user => {
        if (!user) return console.log('user not defined');
        this.user = user;
        this.loginForm.patchValue({
          'username': this.user.username,
          'password': this.user.password
        });
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  dismiss() {
    this._viewCtrl.dismiss();
  }

  onSubmit() {
    ['username', 'password'].map(item => {
      this.user[item] = this.loginForm.get(item).value;
    });

    if (this.loginForm.get('remember').value) {
      this._storage.set('user', this.user);
    } else {
      this._storage.remove('user');
    }

    this._viewCtrl.dismiss();

  }

  openRegister() {
    let modal = this.modalCtrl.create(RegisterPage);
    modal.present();
    modal.onDidDismiss(
      () => this.dismiss()
    );
  }


}

import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  registerForm: FormGroup;
  image: string | any = "assets/images/logo.png";
  options: CameraOptions = {
    quality: 100,
    targetHeight: 100,
    targetWidth: 100,
    correctOrientation: true,
    allowEdit: true,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.PNG,
    mediaType: this.camera.MediaType.PICTURE,
    cameraDirection: this.camera.Direction.FRONT
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private viewCtrl: ViewController,
              private camera: Camera,
              private sanitizer: DomSanitizer,
              private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      telnum: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  dismiss() {
    this.viewCtrl.dismiss(true);
  }

  getPicture() {
    const _options = this.options;
    _options.sourceType = 1;
    this.camera.getPicture(_options)
      .then(
        (imageData) => {
          this.image = imageData;

        },
        (error) => {
          console.log('Error obtaining picture', error);
        })
  }

  getFromLibrary() {
    const _options = this.options;
    _options.sourceType = 0; //get from library;
    this.camera.getPicture(_options)
      .then((imageData) => {
        this.image = imageData;
      })
      .catch((error) => {
        console.log(`something error happen,${error}`);
      })
  }


  onSubmit() {
    console.log(this.registerForm.value);
    this.dismiss();
  }

}

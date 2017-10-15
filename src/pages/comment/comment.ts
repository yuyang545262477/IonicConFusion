import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  _commentForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private _formBuilder: FormBuilder) {

    this._commentForm = this._formBuilder.group({
      author: ['', Validators.required],
      rating: [5, Validators.required],
      comment: ['', Validators.required],
      date: ''
    })
  }

  cancelComment() {
    this.viewCtrl.dismiss();
  }

  commentSubmit() {
    this._commentForm.value.date = new Date().toISOString();
    this.viewCtrl.dismiss(this._commentForm.value);
  }

}

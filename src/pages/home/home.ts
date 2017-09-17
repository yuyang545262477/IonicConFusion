import {Component, Inject, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DishProvider} from "../../providers/dish/dish";
import {LeaderProvider} from "../../providers/leader/leader";
import {PromotionProvider} from "../../providers/promotion/promotion";
import {Dish} from "../../shared/dish";
import {Leader} from "../../shared/leader";
import {Promotion} from "../../shared/promotion";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string;
  promoErrMess: string;
  leaderErrMess: string;


  constructor(public navCtrl: NavController,
              private _dishService: DishProvider,
              private _promotionService: PromotionProvider,
              private _leaderService: LeaderProvider,
              @Inject('BaseURL') private _baseUrl) {
  }

  ngOnInit() {
    this._dishService.getFeaturedDish()
      .subscribe(
        dish => this.dish = dish,
        errmess => this.dishErrMess = <any>errmess);
    this._promotionService.getFeaturedPromotion()
      .subscribe(promotion => this.promotion = promotion,
        errmess => this.promoErrMess = <any>errmess);
    this._leaderService.getFeaturedLeader()
      .subscribe(leader => this.leader = leader,
        errmess => this.leaderErrMess = <any>errmess);
  }

}

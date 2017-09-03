import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';

/**
 * Generated class for the NotificationsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

	notifications: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebase: FirebaseProvider) {

  	firebase.getNotifications().then(data => {
  		this.notifications = data;
  	});

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad NotificationsPage');
  }

}

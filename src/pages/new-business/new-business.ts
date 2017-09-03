import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';

/**
 * Generated class for the NewBusinessPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-business',
  templateUrl: 'new-business.html',
})
export class NewBusinessPage {
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController, public firebase:FirebaseProvider) {
  	
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad NewBusinessPage');
  }

  postBusiness (business) {
    let loader = this.loading.create({
      spinner: 'bubbles',
      content: 'Guardando Empresa'
    });

    loader.present().then(() => {
      this.firebase.postBusiness(business).then(data => {
        // console.log(data);
        loader.dismiss();
        this.navCtrl.pop();        
      });
    });
  }
}

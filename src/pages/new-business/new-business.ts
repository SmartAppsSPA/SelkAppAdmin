import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { LoadingController } from 'ionic-angular';

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
  business: FirebaseListObservable<any>;
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase, public loading: LoadingController) {
  	this.business = db.list('/business');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewBusinessPage');
  }

  addBusiness(data) {

    console.log(data);

    let loader = this.loading.create({
  	  spinner: 'bubbles',
      content: 'Guardando Empresa'
    });

    loader.present().then(() => {
      this.business.push({
        info: {
          name: data.name,
          email: data.email,
          phone:  data.phone
        },
        premium: false,
        offers: ['¡Queremos darte la bienvenida! En ' + data.name +  ' estamos felices de poder compartir contigo nuestras promociones y ofertas.']
      }).then( newContact => {
        loader.dismiss();
        this.navCtrl.pop();
      }, error => {
        console.log(error);
      });
    });
  }

}

import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';
import { NewBusinessPage } from '../new-business/new-business';
import { EditPage } from '../edit/edit';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  business: FirebaseListObservable<any>;
  offers: FirebaseListObservable<any>;
  newBusinessPage: any;
  editBusiness: any;
  loader: any;

  constructor(public navCtrl: NavController, public db: AngularFireDatabase, public loading: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController) {

    this.newBusinessPage = NewBusinessPage;
  	this.editBusiness = EditPage;

  	this.loader = this.loading.create({
  	  spinner: 'bubbles',
      content: 'Cargando lista de empresas'
    });

    this.loader.present().then(() => {
	  	this.business = db.list('/business');

	  	this.business.subscribe(data => {
	  		this.loader.dismiss();
	  	});
    });
  }

  delete(id) {
    let confirm = this.alertCtrl.create({
      title: '¿Eliminar?',
      message: '¿Quieres eliminar esta empresa?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.business.remove(id);

            let toast = this.toastCtrl.create({
              message: 'La empresa fue eliminada con éxito.',
              duration: 2000,
              position: 'top'
            });

            toast.onDidDismiss(() => {
              console.log('Dismissed toast');
            });

            toast.present();
          }
        }
      ]
    });

    confirm.present();
  }

  edit(id, e) {
    this.offers = this.db.list('/offers/', {
      query: {
        orderByChild: 'business',
        equalTo: id
      }
    });

    this.loader = this.loading.create({
      spinner: 'bubbles',
      content: 'Cargando datos'
    });

    this.loader.present().then(() => {
      this.business.subscribe(data => {
        this.loader.dismiss();
      });
    });

    this.navCtrl.push(this.editBusiness, {
      id: id,
      offers: this.offers
    });
    

  }

  ionViewDidLoad() {
    
  }
}

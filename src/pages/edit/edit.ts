import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable  } from 'angularfire2/database';
import { ToastController, AlertController } from 'ionic-angular';

/**
 * Generated class for the EditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

	business: FirebaseObjectObservable<any>;
	id: any;
	offers: FirebaseObjectObservable<any>;
	changed: boolean;
  newOffer: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, public toastCtrl: ToastController, public alertCtrl: AlertController) {
  	this.id = navParams.get('id');
  	this.offers = navParams.get('offers');
  	this.changed = false;
    this.newOffer = '';

  	db.object('/business/' + this.id).subscribe(data => {
  		this.business = data;  		
  	});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }

  save() {
  	this.db.object('/business/' + this.id).set(this.business);
  	//this.navCtrl.pop();

  	let toast = this.toastCtrl.create({
	    message: 'La información de la empresa fue guardada con éxito.',
	    duration: 2000,
	    position: 'bottom'
	  });

	  toast.onDidDismiss(() => {
	    console.log('Dismissed toast');
	  });

	  toast.present();

	  this.changed = false;
  }

  changedToTrue() {
  	this.changed = true;
  }

  ionViewWillLeave() {
  	if (this.changed) {
	    let alert = this.alertCtrl.create({
		    title: '¿Guardar cambios?',
		    message: '¿Quieres guardar los cambios?',
		    buttons: [
		      {
		        text: 'Cancelar',
		        role: 'cancel',
		        handler: () => {
		          console.log('Cancel clicked');
		        }
		      },
		      {
		        text: 'Guardar',
		        handler: () => {
		          this.save();
		        }
		      }
		    ]
		  });

		  alert.present();  		
  	}
  }

  addOffer(id, newOffer) {
  	this.db.list('/offers/').push({
  		date: Date(),
  		text: newOffer,
  		business: id
  	});

    this.newOffer = '';
  }

  removeOffer(idOffer) {
    let alert = this.alertCtrl.create({
      title: '¿Eliminar Oferta?',
      message: '¿Quieres eliminar esta oferta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.db.object('/offers/' + idOffer).remove();
          }
        }
      ]
    });

    alert.present(); 
  }

}

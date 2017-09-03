import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController, AlertController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
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

  business: any;
  id: any;
  offers: any;
  changed: boolean;
  newOffer: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebase: FirebaseProvider, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.id = navParams.get('id');
    this.changed = false;
    this.newOffer = '';

    this.getBusiness();

    this.getOffers();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad EditPage');
  }

  getBusiness() {
    this.firebase.getBusiness(this.id).then(data => {
      this.business = data;
      // console.log(this.business);
    });
  }

  save() {
    this.firebase.putBusiness(this.id, this.business);

    let toast = this.toastCtrl.create({
      message: 'La información de la empresa fue guardada con éxito.',
      duration: 2000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      // console.log('Dismissed toast');
    });

    toast.present();

    this.changed = false;

    this.navCtrl.pop();
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
              // console.log('Cancel clicked');
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

  newOfferKeyup(event, newOffer) {
    if (event.keyCode == 13) {
      this.addOffer(newOffer);
    }
  }

  addOffer(newOffer) {
    this.firebase.postOffer(this.id, newOffer).then(data => {
      this.getOffers();
    });

    this.newOffer = '';
  }

  getOffers() {
    this.firebase.getOffers(this.id).then(data => {
      this.offers = data;
    })
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
            // console.log('Cancel clicked');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.firebase.deleteOffer(idOffer).then(data => {
              this.getOffers();
            });
          }
        }
      ]
    });

    alert.present(); 
  }
  
  editOffer(idOffer, offer) {
    let prompt = this.alertCtrl.create({
      title: 'Editar Oferta',
      message: "Ingresa el texto corregido de la oferta",
      inputs: [
        {
          name: 'offer',
          placeholder: 'Title',
          value: offer
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.firebase.putOffer(idOffer, data.offer).then(data => {
              this.getOffers();
            });
          }
        }
      ]
    });
    prompt.present();
  }
}

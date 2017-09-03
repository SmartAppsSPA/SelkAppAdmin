import { Component } from '@angular/core';
import { NewBusinessPage } from '../new-business/new-business';
import { NotificationsPage } from '../notifications/notifications';
import { EditPage } from '../edit/edit';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  businessList: any;
  newBusinessPage: any;
  notificationsPage: any;
  editBusiness: any;
  loader: any;

  constructor(public navCtrl: NavController, public firebase: FirebaseProvider, public loading: LoadingController, public alertCtrl: AlertController, public toastCtrl: ToastController) {

    this.newBusinessPage = NewBusinessPage;
    this.notificationsPage = NotificationsPage;
  	this.editBusiness = EditPage;

  	this.loader = this.loading.create({
  	  spinner: 'bubbles',
      content: 'Cargando lista de empresas'
    });

    this.loader.present().then(() => {
      firebase.businessList.subscribe(data => {
        // console.log(data);
	  	  this.businessList = data;
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
            // console.log('Disagree clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.firebase.deleteBusiness(id);

            let toast = this.toastCtrl.create({
              message: 'La empresa fue eliminada con éxito.',
              duration: 2000,
              position: 'top'
            });

            toast.onDidDismiss(() => {
              // console.log('Dismissed toast');
            });

            toast.present();
          }
        }
      ]
    });

    confirm.present();
  }

  edit(id, e) { 
    this.loader = this.loading.create({
      spinner: 'bubbles',
      content: 'Cargando datos'
    });

    this.loader.present().then(() => {
      this.navCtrl.push(this.editBusiness, {
        id: id
      });

      this.loader.dismiss();
    });
  }

  ionViewDidLoad() {
    
  }
}

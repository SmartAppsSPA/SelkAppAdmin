import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';

/*
	Generated class for the FirebaseProvider provider.

	See https://angular.io/docs/ts/latest/guide/dependency-injection.html
	for more info on providers and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

	businessList: any;

	constructor(public db: AngularFireDatabase) {
			this.businessList = this.db.list('/business');
	}

	getBusiness(id) {
		return new Promise(resolve => {
			(this.db.object('/business/' + id)).subscribe(data => {
				resolve(data);
			});
		});
	}

	postBusiness(business) {
		return new Promise(resolve => {
			this.businessList.push({
				info: {
					name: business.name,
					email: business.email || '',
					phone:  business.phone || ''
				},
				premium: false
			}).then( newBusiness => {
				resolve(newBusiness);
			}, error => {
				resolve(error);
			});
		});        
	}

	deleteBusiness(id) {
		return new Promise(resolve => {
			this.businessList.remove(id);
			resolve(id);
		});
	}

	putBusiness(id, e) {
		this.db.object('/business/' + id).set(e);
	}

	getOffers(idBusiness) {
		return new Promise(resolve => {
			(this.db.list('/offers/' + idBusiness).map((arr) => { 
				return arr.reverse();
			})).subscribe(data => {
				resolve(data);
			});
		});
	}

	postOffer(idBusiness, text, length) {
		let fullDate = new Date();

		/**** Separa fecha completa en fecha y horas, con ceros a la izquierda ****/
		let date = fullDate.getFullYear() + '/' + ('0' + (fullDate.getMonth() + 1)).slice(-2) + '/' + ('0' + fullDate.getDate()).slice(-2);
		let hour = ('0' + fullDate.getHours()).slice(-2) + ':' + ('0' + fullDate.getMinutes()).slice(-2);
		/**** Fin fecha y hora ****/

		return new Promise(resolve => {
			this.db.object('/business/' + idBusiness).subscribe(data => {
				let newData = {
				  date: date,
				  hour: hour,
				  text: text
				}

				//Agrega a listado de ofertas generales
				this.db.list('/offers/' + idBusiness + '/').push(newData).then(data2 => {

					//Complementa con datos de la empresa para rápido acceso 
					let newNotification = {
					  date: date,
					  hour: hour,
					  text: text,
						name: data.info.name,
						idOffer: data2.key
					}

					//Agrega a notificaciones (sólo última oferta por empresa)
					this.db.object('/notifications/' + idBusiness + '/').set(newNotification);

					resolve(newData);					
				})

			})
		});			

	}

	putOffer(idBusiness, idOffer, offer) {
		return new Promise(resolve => {
			this.db.object('/offers/' + idBusiness + '/' + idOffer).update({
				text: offer
			}).then(data => {
				resolve(idOffer);
			});
		});
	}

	deleteOffer(idBusiness, idOffer) {
		return new Promise(resolve => {
			let lastNotification = this.db.object('/notifications/' + idBusiness);

			lastNotification.subscribe(data => {
				if (data.idOffer == idOffer) {
				 	lastNotification.remove();
				}
			});

			this.db.object('/offers/' + idBusiness + '/' + idOffer).remove();
			
			resolve(idOffer);
		});
	}

	getNotifications () {
		return new Promise(resolve => {
			(this.db.list('/notifications')).map(e => {
				return e;
			}).subscribe(data => {
				resolve(data);
			});
		});
	}
}

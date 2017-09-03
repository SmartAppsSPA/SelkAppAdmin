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
					email: business.email,
					phone:  business.phone
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
			(this.db.list('/offers/', {
				query: {
					orderByChild: 'business',
					equalTo: idBusiness
				}
			}).map((arr) => { 
				return arr.reverse();
			})).subscribe(data => {
				resolve(data);
			});
		});
	}

	postOffer(idBusiness, newOffer) {
		let fullDate = new Date();

		/**** Separa fecha completa en fecha y horas, con ceros a la izquierda ****/
		let date = fullDate.getFullYear() + '/' + ('0' + (fullDate.getMonth() + 1)).slice(-2) + '/' + ('0' + fullDate.getDate()).slice(-2);
		let hour = ('0' + fullDate.getHours()).slice(-2) + ':' + ('0' + fullDate.getMinutes()).slice(-2);
		/**** Fin fecha y hora ****/

		return new Promise(resolve => {
			this.db.list('/offers/').push({
		      date: date,
		      hour: hour,
		      text: newOffer,
		      business: idBusiness
		    }).then(data => {
		    	resolve(data);
		    });			
		})
	}

	putOffer(idOffer, offer) {
		return new Promise(resolve => {
			this.db.object('/offers/' + idOffer).update({
				text: offer
			}).then(data => {
				resolve(idOffer);
			});
		})
	}

	deleteOffer(idOffer) {
		return new Promise(resolve => {
			this.db.object('/offers/' + idOffer).remove().then(data => {
				resolve(idOffer);
			});
		})
	}
}

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EditPage } from '../pages/edit/edit';
import { NewBusinessPage } from '../pages/new-business/new-business';
import { FirebaseProvider } from '../providers/firebase/firebase';

export const firebaseConfig = {
  apiKey: "AIzaSyCL8IYoQfAmdV20RA2pMg3HgWbX81PGwR8",
  authDomain: "selkapp-ea94e.firebaseapp.com",
  databaseURL: "https://selkapp-ea94e.firebaseio.com",
  projectId: "selkapp-ea94e",
  storageBucket: "selkapp-ea94e.appspot.com",
  messagingSenderId: "87671326090"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EditPage,
    NewBusinessPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EditPage,
    NewBusinessPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
  ]
})
export class AppModule {}

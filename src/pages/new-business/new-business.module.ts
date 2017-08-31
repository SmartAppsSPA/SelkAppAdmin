import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewBusinessPage } from './new-business';

@NgModule({
  declarations: [
    NewBusinessPage,
  ],
  imports: [
    IonicPageModule.forChild(NewBusinessPage),
  ],
})
export class NewBusinessPageModule {}

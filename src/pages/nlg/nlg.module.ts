import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NlgPage } from './nlg';
import { DynamicFormModule } from '../../app/dynamic-form/dynamic-form.module';

@NgModule({
  declarations: [
    NlgPage
  ],
  imports: [
    IonicPageModule.forChild(NlgPage),
    DynamicFormModule
  ],
})
export class NlgPageModule { }

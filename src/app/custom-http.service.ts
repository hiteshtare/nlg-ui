import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Platform } from 'ionic-angular';

@Injectable()
export class CustomHttpService {

  // public basepath = 'https://2adde776.ngrok.io';
  public basepath = 'http://192.0.4.185:5000';

  constructor(private _platform: Platform) {
    // if (this._platform.is("cordova")) {
    //   this.basepath = 'https://bca70363.ngrok.io';
    // }
  }

}

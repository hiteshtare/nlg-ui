import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Platform } from 'ionic-angular';

@Injectable()
export class CustomHttpService {

  public basepath = '/getSentences';

  constructor(private _platform: Platform) {
    // if (this._platform.is("cordova")) {
    //   this.basepath = 'https://bca70363.ngrok.io';
    // }
  }

}

import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Platform } from 'ionic-angular';

@Injectable()
export class CustomHttpService {

  // public basepath = 'https://entry.dev15.na01.labs.omnipresence.io/api/nlg';
  // public basepath = 'http://192.0.4.185:8080';
  public basepath = 'https://4167b522.ngrok.io/api/nlg';

  constructor(private _platform: Platform) {
    // if (this._platform.is("cordova")) {
    //   this.basepath = 'https://bca70363.ngrok.io';
    // }
  }

}

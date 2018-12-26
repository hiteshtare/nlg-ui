import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Service } from '../../app/service';
import { DynamicFormService } from '../../app/dynamic-form/services/dynamic-form.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomHttpService } from '../../app/custom-http.service';

/**
 * Generated class for the NlgPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nlg',
  templateUrl: 'nlg.html',
})
export class NlgPage {
  submittedData;
  form: FormGroup;
  payLoad = '';
  controls: any[];

  dataInfo: any = [];
  intent: string = 'book';
  name: string = '';
  date: string = '';
  time: string = '';
  subject: string = '';
  someForm: FormGroup;
  day = ["Monday", "Tuesday", "Wednesday", "Thuday", "Friday"]
  intentStr = [];
  nameStr = [];
  dateStr = [];
  timeStr = [];
  subjStr = [];
  intentArr = [{ value: 'book', text: 'Book' }, { value: 'edit', text: 'Edit' }, { value: 'search', text: 'Search' }];

  noOfSamples = 5;

  ionInputForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient,
    public loadingCtrl: LoadingController, public service: Service, private dynamicFormService: DynamicFormService,
    private _FB: FormBuilder, private customHttpService: CustomHttpService) {

    this.controls = service.getQuestions();
    this.form = this.dynamicFormService.toFormGroup(this.controls);

    // Define the FormGroup object for the form
    // (with sub-FormGroup objects for handling
    // the dynamically generated form input fields)
    this.ionInputForm = this._FB.group({
      // name: ['', Validators.required],
      technologies: this._FB.array([
        this.initTechnologyFields()
      ])
    });

    // this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NlgPage');
  }

  onSubmit(formValue) {
    // this.submittedData = this.form.getRawValue();
    const intent = formValue.intent;
    if (intent === 'Book' || intent === 'Edit')
      this.getData(formValue);
  }

  getData(p_formValue) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    //let url = `${this.customHttpService.basepath}/getSentences?no_of_samples=${this.noOfSamples}`;
    let url = `https://a27819d1.ngrok.io/getSentences?no_of_samples=${this.noOfSamples}`;

    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    this.http.get(url, { headers: headers }).subscribe(data => {
      console.log(data);
      this.dataInfo = data;

      this.intent = p_formValue.intent;
      if (this.intent === 'Book') {
        this.name = p_formValue.b_name;
        this.date = p_formValue.b_date;
        this.time = p_formValue.b_time;
        this.subject = p_formValue.b_subject;
      }
      else
        if (this.intent === 'Edit') {
          this.name = p_formValue.e_name;
          this.date = p_formValue.e_date;
          this.time = p_formValue.e_time;
          this.subject = p_formValue.e_subject;
        }

      var fIntent = this.intent;
      var fName = this.name;
      var fDate = this.date;
      var fTime = this.time;
      var fSubject = this.subject;
      var fday = this.day;
      var randomNumber = Math.floor(Math.random() * fday.length);
      console.log("random", fday[randomNumber]);


      const meetingArr = ["Appointment", "Meeting", "Session"];

      //only intent
      this.intentStr = this.dataInfo.map(function (x) {
        console.log(fIntent);
        return x.replace(/{ intent }/g, fIntent);
      });

      //all 
      if (this.name !== "" && this.date !== "" && this.time !== "" && this.subject !== "") {
        this.dateStr = this.intentStr.map(function (x) {
          console.log(fDate);
          return x.replace(/{ date }/g, fDate).replace(/{ name }/g, fName).replace(/{ time }/g, fTime).replace(/{ subject }/g, fSubject).replace(/{ day }/g, fday[randomNumber])
        });

        console.log('Before Meeting replacement');
        console.log(this.dateStr);
        const withoutMeeting = this.dateStr;
        let withMeeting = [];

        meetingArr.forEach((item) => {
          const result = withoutMeeting.map(function (x) {
            console.log(fIntent);
            return x.replace(/{ meeting }/g, item);
          });
          withMeeting.push('----------------------------------------------------------------------------------------------------');
          withMeeting = withMeeting.concat(result);
        });

        this.dateStr = withMeeting;
        console.log('After Meeting replacement');
        console.log(this.dateStr);
      }//end of if (this.name !== "" && this.date !== "" && this.time !== "" && this.subject !== "")

      if (this.date == "" && this.time == "" && this.name == "" && this.subject == "") {

        var ranDate = randomDate(new Date(2018, 0, 1), new Date())
        var ranTime = randomTime(new Date(2018, 0, 1), new Date(), 0, 12)
        this.nameStr = this.intentStr.map(function (x) {
          return x.replace(/{ date }/g, ranDate).replace(/{ intent }/g, fIntent).replace(/{ name }/g, "HCP").replace(/{ subject }/g, "General Meeting").replace(/{ time }/g, ranTime).replace(/{ day }/g, fday[randomNumber])
        });
      }//end of if (this.date == "" && this.time == "" && this.name == "" && this.subject == "")

      loading.dismiss();
    });//end of this.http.get
  }


  /**
 * Generates a FormGroup object with input field validation rules for
 * the technologies form object
 *
 * @public
 * @method initTechnologyFields
 * @return {FormGroup}
 */
  initTechnologyFields(): FormGroup {
    return this._FB.group({
      name: ['', Validators.required]
    });
  }

  /**
   * Programmatically generates a new technology input field
   *
   * @public
   * @method addNewInputField
   * @return {none}
   */
  addNewInputField(): void {
    const control = <FormArray>this.ionInputForm.controls.technologies;
    control.push(this.initTechnologyFields());
  }

  /**
   * Programmatically removes a recently generated technology input field
   *
   * @public
   * @method removeInputField
   * @param i    {number}      The position of the object in the array that needs to removed
   * @return {none}
   */
  removeInputField(i: number): void {
    const control = <FormArray>this.ionInputForm.controls.technologies;
    control.removeAt(i);
  }

  /**
 * Receive the submitted form data
 *
 * @public
 * @method manage
 * @param val    {object}      The posted form data
 * @return {none}
 */
  manage(val: any): void {
    console.dir(val);
  }

}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}



function randomTime(start, end, startHour, endHour) {
  var date = new Date(+start + Math.random() * (end - start));
  var hour = startHour + Math.random() * (endHour - startHour) | 0;
  date.setHours(hour);
  return date;
}
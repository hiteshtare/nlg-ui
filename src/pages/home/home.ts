import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
//import { dataService } from '../../service/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
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



  constructor(public navCtrl: NavController, private http: HttpClient, public formBuilder: FormBuilder, public loadingCtrl: LoadingController) {

    this.someForm = formBuilder.group({
      'inputSample': ['', Validators.compose([Validators.required])],
      'selectIntent': ['', Validators.compose([Validators.required])],
      'input2': ['', Validators.compose([])],
      'input3': ['', Validators.compose([])],
      'input4': ['', Validators.compose([])],
    });

    // this.getData();
  }

  // refresh(){
  //   this.someForm.markAsPristine;
  // }

  //url = 'http://127.0.0.1:5000/getSentences/50';

  getData() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    let url = `http://52.202.224.199:5001/getSentences?no_of_samples=${this.noOfSamples}`;

    let headers = new HttpHeaders();

    this.http.get(url, { headers: headers }).subscribe(data => {
      console.log(data);
      this.dataInfo = data;
      var fIntent = this.intent;
      var fName = this.name;
      var fDate = this.date;
      var fTime = this.time;
      var fSubject = this.subject;
      var fday = this.day
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
import { ApiService } from './shared/services/api.service';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public loaderMessage = '';

  constructor(public apiService: ApiService, private spinner: NgxSpinnerService) {
    // this.fetchSentences();
  }

  fetchSentences() {
    this.loaderMessage = 'Fetching Sentences...';
    this.spinner.show();

    this.apiService.getSentences(1, 'meeting').subscribe((resp: Response) => {
      if (resp) {
        console.log(`getSentences`);
        console.log(resp);
        this.spinner.hide();

        // this.fetchParaphrases();
      }
    });
  }

  fetchParaphrases() {
    this.loaderMessage = 'Fetching Parapharses...';
    this.spinner.show();
    const sentences = ['Search side effects through the document related to modafinil', 'Search documentation of modafinil'];

    this.apiService.getParaphrases(sentences).subscribe((resp: Response) => {
      if (resp) {
        console.log(`getParaphrases`);
        console.log(resp);
        this.spinner.hide();
      }
    });
  }
}

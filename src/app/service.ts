import { Injectable } from '@angular/core';

import { IonInput } from './dynamic-form/models/ion-input.model';
import { DropdownInput } from './dynamic-form/models/dropdown-input.model';
import { CheckboxInput } from './dynamic-form/models/checkbox-input.model';
import { BaseModel } from './dynamic-form/models/base.model';


@Injectable()
export class Service {

  getKeywords() {

    let questions: BaseModel<any>[] = [

      new DropdownInput({
        key: 'intent',
        label: 'Intents',
        options: [
          { key: 'Book', value: 'Book' },
          { key: 'Edit', value: 'Edit' },
          { key: 'Search', value: 'Search' }
        ],
        order: 1,
        required: true
      }),

      // new CheckboxInput({
      //   key: 'checkbox1',
      //   label: 'checkbox1 - example1',
      //   showWhen: {
      //     key: 'dropdown',
      //     value: 'example1',
      //   },
      //   order: 2
      // }),

      ////////////////////////////////////BOOK////////////////////////////////
      new IonInput({
        key: 'b_name',
        label: 'Name',
        showWhen: {
          key: 'intent',
          value: 'Book',
        },
        order: 1
      }),
      new IonInput({
        key: 'b_date',
        label: 'Date',
        showWhen: {
          key: 'intent',
          value: 'Book',
        },
        order: 2
      }),
      new IonInput({
        key: 'b_time',
        label: 'Time',
        showWhen: {
          key: 'intent',
          value: 'Book',
        },
        order: 3
      }),
      new IonInput({
        key: 'b_subject',
        label: 'Subject',
        showWhen: {
          key: 'intent',
          value: 'Book',
        },
        order: 4,
        // required: true
      }),
      ////////////////////////////////////BOOK////////////////////////////////
      ////////////////////////////////////EDIT////////////////////////////////
      new IonInput({
        key: 'e_name',
        label: 'Name',
        showWhen: {
          key: 'intent',
          value: 'Edit',
        },
        order: 1,
        // required: true
      }),
      new IonInput({
        key: 'e_date',
        label: 'Date',
        showWhen: {
          key: 'intent',
          value: 'Edit',
        },
        order: 2,
        // required: true
      }),
      new IonInput({
        key: 'e_time',
        label: 'Time',
        showWhen: {
          key: 'intent',
          value: 'Edit',
        },
        order: 3,
        // required: true
      }),
      new IonInput({
        key: 'e_subject',
        label: 'Subject',
        showWhen: {
          key: 'intent',
          value: 'Edit',
        },
        order: 4,
        //required: true
      }),
      ////////////////////////////////////EDIT////////////////////////////////
      ////////////////////////////////////SEARCH////////////////////////////////
      new IonInput({
        key: 'file',
        label: 'File',
        showWhen: {
          key: 'intent',
          value: 'Search',
        },
        order: 2,
        //required: true
      }),
      new IonInput({
        key: 'entity',
        label: 'Entity',
        showWhen: {
          key: 'intent',
          value: 'Search',
        },
        order: 3,
        //required: true
      }),
      new IonInput({
        key: 'topic',
        label: 'Topic',
        showWhen: {
          key: 'intent',
          value: 'Search',
        },
        order: 4,
        //required: true
      }),
      new IonInput({
        key: 'date',
        label: 'Date',
        showWhen: {
          key: 'intent',
          value: 'Search',
        },
        order: 5,
        //required: true
      }),
      new IonInput({
        key: 'time',
        label: 'Time',
        showWhen: {
          key: 'intent',
          value: 'Search',
        },
        order: 6,
        //required: true
      })
      ////////////////////////////////////SEARCH////////////////////////////////
    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}

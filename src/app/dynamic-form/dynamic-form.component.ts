
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription'

import { BaseModel } from './models/base.model';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'dynamic-control',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  @Input() input: BaseModel<any>;
  @Input() form: FormGroup;

  control: FormControl;

  hidden: boolean;

  subscription: Subscription;

  ngOnInit() {
    this.control = this.form.get(this.input.key) as FormControl;
    this.setUpConditions();
  }

  setUpConditions() {
    if (!this.input.showWhen) {
      return;
    }

    let relatedControl = this.form.get(this.input.showWhen.key);
    if (!relatedControl) {
      return;
    }

    this.updateHidden();
    this.subscription = relatedControl.valueChanges.subscribe(x => this.updateHidden());
  }

  updateHidden(): void {
    let relatedControl = this.form.get(this.input.showWhen.key);
    this.hidden = relatedControl.value !== this.input.showWhen.value;

    this.hidden ? this.control.disable() : this.control.enable();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

export class BaseModel<T> {

  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  showWhen: ControlCondition;

  constructor(options: {
    value?: T,
    key?: string,
    label?: string,
    required?: boolean,
    order?: number,
    controlType?: string,
    showWhen?: ControlCondition
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.showWhen = options.showWhen;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
  }
}

export class ControlCondition {
  key: string;
  value: string;
}
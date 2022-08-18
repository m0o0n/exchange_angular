import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BaseValueSelector,
  ToValueSelector,
} from '../reducers/exchange.selectors';

import {
  ChangeBaseInputValue,
  ChangeBaseValue,
  ChangeToInputValue,
  ChangeToValue,
  InitValues,
} from '../reducers/exchange.actions';
@Component({
  selector: 'app-curency-row',
  templateUrl: './curency-row.component.html',
  styleUrls: ['./curency-row.component.css'],
})
export class CurencyRowComponent implements OnInit {
  BaseValue: any;
  BaseValue$: any = this.store.select(BaseValueSelector).subscribe((val) => {
    this.BaseValue = val;
  });

  ToValue: any;
  ToValue$ = this.store.select(ToValueSelector).subscribe((val) => {
    this.ToValue = val;
  });

  @Input() FromBase: any;

  @Input() baseInpVal: any = 0;
  @Input() toInpVal: any = 0;

  ChangeBaseValue(newValue: any) {
    this.store.dispatch(ChangeBaseValue({ value: newValue }));
    this.store.dispatch(InitValues());
  }
  ChangeToValue(newValue: any) {
    this.store.dispatch(ChangeToValue({ value: newValue }));
    this.store.dispatch(InitValues());
  }
  ChangeBaseInputValue(newValue: any) {
    this.store.dispatch(ChangeBaseInputValue({ count: newValue.target.value }));
    this.store.dispatch(InitValues());
  }
  ChangeToInputValue(newValue: any) {
    this.store.dispatch(ChangeToInputValue({ count: newValue.target.value }));
    this.store.dispatch(InitValues());
  }
  constructor(private store: Store) {}
  ngOnInit(): void {}
}

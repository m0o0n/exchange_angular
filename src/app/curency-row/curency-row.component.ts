import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BaseValueSelector,
  ToValueSelector,
  FromInTogleSelector,
  ExRateSelector,
  AmountSelector,
  FromBaseSelector,
  ChangeBaseInputValue,
  ChangeBaseValue,
  ChangeToInputValue,
  ChangeToValue,
  CalcExRate,
  ToFixed,
} from '../reducers/exchange.reducer';
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

  ExRate: any;
  ExRate$ = this.store.select(ExRateSelector).subscribe((val) => {
    this.ExRate = val;
  });

  Amount: any;
  Amount$ = this.store.select(AmountSelector).subscribe((val) => {
    this.Amount = val;
  });

  FromBase: any;
  FromBase$ = this.store.select(FromBaseSelector).subscribe((val) => {
    this.FromBase = Object.keys(val).filter((e: any) => {
      if (e !== 'BTC') {
        return e;
      }
    });
  });

  baseInpVal: any = 0;
  toInpVal: any = 0;

  ChangeBaseValue(newValue: any) {
    this.store.dispatch(ChangeBaseValue({ value: newValue }));
    this.store.dispatch(CalcExRate());
    this.toInpVal = ToFixed(this.Amount * this.ExRate, 2);
    this.baseInpVal = this.Amount;
  }
  ChangeToValue(newValue: any) {
    this.store.dispatch(ChangeToValue({ value: newValue }));
    this.store.dispatch(CalcExRate());
    this.toInpVal = this.Amount;
    this.baseInpVal = ToFixed(this.Amount / this.ExRate, 2);
  }
  ChangeBaseInputValue(newValue: any) {
    this.store.dispatch(ChangeBaseInputValue({ count: newValue.target.value }));
    this.toInpVal = ToFixed(this.Amount * this.ExRate, 2);
    this.baseInpVal = newValue.target.value;
  }
  ChangeToInputValue(newValue: any) {
    this.store.dispatch(ChangeToInputValue({ count: newValue.target.value }));
    this.toInpVal = newValue.target.value;
    this.baseInpVal = ToFixed(this.Amount / this.ExRate, 2);
  }
  constructor(private store: Store) {}
  ngOnInit(): void {}
}

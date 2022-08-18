import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DataService } from './services/data.service';
import {
  CalcExRate,
  ChangeBaseInputValue,
  ChangeBaseValue,
  ChangeToInputValue,
  ChangeToValue,
  InitValues,
  SetData,
} from './reducers/exchange.actions';
import {
  BaseInputValueSelector,
  BaseValueSelector,
  FromBaseSelector,
  ToInputValueSelector,
  ToValueSelector,
} from './reducers/exchange.selectors';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  FromBase: any;
  FromBaseKeys: any;
  FromBase$ = this.store.select(FromBaseSelector).subscribe((val) => {
    this.FromBase = val;
    this.FromBaseKeys = Object.keys(val).filter((e: any) => {
      if (e !== 'BTC') {
        return e;
      }
    });
  });

  BaseInputValue: any;
  BaseInputValue$ = this.store
    .select(BaseInputValueSelector)
    .subscribe((val) => {
      this.BaseInputValue = val;
    });

  ToInputValue: any;
  ToInputValue$ = this.store.select(ToInputValueSelector).subscribe((val) => {
    this.ToInputValue = val;
  });

  BaseValue: any;
  BaseValue$: any = this.store.select(BaseValueSelector).subscribe((val) => {
    this.BaseValue = val;
  });

  ToValue: any;
  ToValue$ = this.store.select(ToValueSelector).subscribe((val) => {
    this.ToValue = val;
  });

  ChangeBaseInputValue(newValue: any) {
    this.store.dispatch(ChangeBaseInputValue({ count: newValue.target.value }));
    this.store.dispatch(InitValues());
  }
  ChangeToInputValue(newValue: any) {
    this.store.dispatch(ChangeToInputValue({ count: newValue.target.value }));
    this.store.dispatch(InitValues());
  }

  ChangeBaseValue(newValue: any) {
    this.store.dispatch(ChangeBaseValue({ value: newValue }));
    this.store.dispatch(InitValues());
  }
  ChangeToValue(newValue: any) {
    this.store.dispatch(ChangeToValue({ value: newValue }));
    this.store.dispatch(InitValues());
  }

  ngOnInit(): void {
    this.dataService.getAll().subscribe((data) => {
      this.store.dispatch(SetData({ data }));
      this.store.dispatch(CalcExRate());
      this.store.dispatch(InitValues());
    });
  }
  constructor(private dataService: DataService, private store: Store) {}
}

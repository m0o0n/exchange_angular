import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DataService } from './services/data.service';
import { CalcExRate, InitValues, SetData } from './reducers/exchange.actions';
import {
  BaseInputValueSelector,
  FromBaseSelector,
  ToInputValueSelector,
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

  ngOnInit(): void {
    this.dataService.getAll().subscribe((data) => {
      this.store.dispatch(SetData({ data }));
      this.store.dispatch(CalcExRate());
      this.store.dispatch(InitValues());
    });
  }
  constructor(private dataService: DataService, private store: Store) {}
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DataService } from './services/data.service';
import { IData } from './reducers/data.model';
import {
  BaseInputValueSelector,
  CalcExRate,
  FillFromBase,
  FromBaseSelector,
  InitValues,
  SetData,
  ToFixed,
  ToInputValueSelector,
} from './reducers/exchange.reducer';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  Usd: any;
  Eur: any;
  Btc: any;
  FromBase: any;
  FromBase$ = this.store.select(FromBaseSelector).subscribe((val) => {
    this.FromBase = val;
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
      this.store.dispatch(FillFromBase());
      this.store.dispatch(InitValues());
      this.Usd = ToFixed(this.FromBase.USD, 2);
      this.Eur = ToFixed(this.FromBase.EUR, 2);
      this.Btc = ToFixed(this.FromBase.BTC, 0);
    });
  }
  constructor(private dataService: DataService, private store: Store) {}
}

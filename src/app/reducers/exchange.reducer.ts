import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { createAction, props } from '@ngrx/store';
import { IData } from './data.model';

export interface ValuesState {
  data: Array<IData>;
  FromBase: Object;
  BaseValue: string;
  ToValue: string;
  BaseInputValue: number;
  ToInputValue: number;
  FromInTogle: boolean;
  ExRate: number;
  Amount: number;
}
export const initialState: ValuesState = {
  data: [{ ccy: 'UAH', base_ccy: 'UAH', buy: '1', sale: '1' }],
  FromBase: {},
  BaseValue: 'USD',
  ToValue: 'UAH',
  BaseInputValue: 1,
  ToInputValue: 1,
  FromInTogle: true,
  ExRate: 1,
  Amount: 1,
};
export const ChangeBaseValue = createAction(
  '[Exchange] ChangeBaseValue',
  props<{ value: string }>()
);
export const ChangeToValue = createAction(
  '[Exchange] ChangeToValue',
  props<{ value: string }>()
);

export const ChangeBaseInputValue = createAction(
  '[Exchange] ChangeBaseInputValue',
  props<{ count: number }>()
);

export const ChangeToInputValue = createAction(
  '[Exchange] ChangeToInputValue',
  props<{ count: number }>()
);

export const CalcExRate = createAction('[Exchange] CalcExRate');

export const SetData = createAction(
  '[Exchange] SetData',
  props<{ data: Array<IData> }>()
);

export const FillFromBase = createAction('[Exchange] FillFromBase');

export const InitValues = createAction('[Exchange] InitValues');

export const ExchangeReducer = createReducer(
  initialState,
  on(ChangeBaseValue, (state, action) => ({
    ...state,
    BaseValue: action.value,
    Amount: 1,
  })),

  on(ChangeToValue, (state, action) => ({
    ...state,
    ToValue: action.value,
    Amount: 1,
  })),

  on(ChangeBaseInputValue, (state, action) => ({
    ...state,
    Amount: action.count,
    FromInTogle: true,
  })),

  on(ChangeToInputValue, (state, action) => ({
    ...state,
    Amount: action.count,
    FromInTogle: false,
  })),

  on(SetData, (state, action) => ({
    ...state,
    data: [...state.data, ...action.data],
  })),
  on(CalcExRate, (state) => ({
    ...state,
    ExRate:
      Number(
        state.data.find((e: any) => {
          if (e.ccy === state.BaseValue) {
            return e;
          }
        })?.sale
      ) /
      Number(
        state.data.find((e: any) => {
          if (e.ccy === state.ToValue) {
            return e;
          }
        })?.sale
      ),
  })),
  on(FillFromBase, (state) => ({
    ...state,
    FromBase: Object.fromEntries(
      state.data.map((e: IData) => {
        return [e.ccy, e.sale];
      })
    ),
  })),
  on(InitValues, (state) => ({
    ...state,
    BaseInputValue: state.Amount,
    ToInputValue: state.Amount * state.ExRate,
  }))
);

// SELECTORS

export const featureSelector = createFeatureSelector<ValuesState>('values');

export const BaseValueSelector = createSelector(
  featureSelector,
  (state) => state.BaseValue
);

export const ToValueSelector = createSelector(
  featureSelector,
  (state) => state.ToValue
);

export const BaseInputValueSelector = createSelector(
  featureSelector,
  (state) => state.BaseInputValue
);

export const ToInputValueSelector = createSelector(
  featureSelector,
  (state) => state.ToInputValue
);

export const ExRateSelector = createSelector(
  featureSelector,
  (state) => state.ExRate
);
export const AmountSelector = createSelector(
  featureSelector,
  (state) => state.Amount
);

export const FromBaseSelector = createSelector(
  featureSelector,
  (state) => state.FromBase
);

export const ToFixed = (num: any, afterDot: number) => {
  return Number(num).toFixed(afterDot);
};

import { createReducer, on } from '@ngrx/store';
import {
  ChangeBaseValue,
  ChangeToValue,
  ChangeBaseInputValue,
  ChangeToInputValue,
  SetData,
  CalcExRate,
  InitValues,
} from './exchange.actions';
import { IData, ValuesState } from './data.model';

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

export const ExchangeReducer = createReducer(
  initialState,
  on(ChangeBaseValue, (state, action) => ({
    ...state,
    BaseValue: action.value,
    FromInTogle: true,
    ExRate:
      Number(
        state.data.find((e: any) => {
          if (e.ccy === action.value) {
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

  on(ChangeToValue, (state, action) => ({
    ...state,
    ToValue: action.value,
    FromInTogle: false,
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
          if (e.ccy === action.value) {
            return e;
          }
        })?.sale
      ),
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
    FromBase: Object.fromEntries(
      state.data.map((e: IData) => {
        if (e.ccy !== 'BTC') {
          return [e.ccy, ToFixed(e.sale, 2)];
        } else return [e.ccy, ToFixed(e.sale, 0)];
      })
    ),
  })),

  on(InitValues, (state) => ({
    ...state,
    Amount: 1,
    BaseInputValue: state.FromInTogle
      ? state.Amount
      : state.Amount / state.ExRate,
    ToInputValue: state.FromInTogle
      ? state.Amount * state.ExRate
      : state.Amount,
  }))
);

// SELECTORS

export const ToFixed = (num: any, afterDot: number) => {
  return Number(num).toFixed(afterDot);
};

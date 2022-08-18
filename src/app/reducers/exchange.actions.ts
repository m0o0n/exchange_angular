import { createAction, props } from '@ngrx/store';
import { IData } from './data.model';

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

export const InitValues = createAction('[Exchange] InitValues');

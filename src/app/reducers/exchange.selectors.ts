import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ValuesState } from './data.model';

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

export const FromBaseSelector = createSelector(
  featureSelector,
  (state) => state.FromBase
);

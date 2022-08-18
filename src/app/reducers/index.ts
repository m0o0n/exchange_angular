import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import { ValuesState } from './data.model';
import { ExchangeReducer } from './exchange.reducer';

export interface State {
  values: ValuesState;
}

export const reducers: ActionReducerMap<State> = {
  values: ExchangeReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export interface IData {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
}

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

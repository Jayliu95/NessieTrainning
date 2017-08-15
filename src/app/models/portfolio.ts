import {Stock} from "./stock";
export class Portfolio{
  _id?: number;
  userId? : number;
  investmentAmount : number;
  stocks: Stock[];
}

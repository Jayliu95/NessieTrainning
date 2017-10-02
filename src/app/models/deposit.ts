export class Deposit{
  constructor(medium: string, transaction_date: string, amount: number, description: string){
    this.medium = medium;
    this.transaction_date = transaction_date;
    this.amount = amount;
    this.description = description;
  }
  medium : string;
  transaction_date : string;
  amount : number;
  description : string;
}

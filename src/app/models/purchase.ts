export class Purchase{
  constructor(merchant_id: string, medium: string, purchase_date: string, amount: number, description: string, toEdit ?: boolean){
    this.merchant_id = merchant_id;
    this.medium = medium;
    this.purchase_date = purchase_date;
    this.amount = amount;
    this.description = description;
    if(toEdit){
      this.toEdit = false;
    }
  }
  merchant_id: string;
  medium: string;
  purchase_date: string;
  amount: number;
  description: string;
  toEdit ? : boolean;
}

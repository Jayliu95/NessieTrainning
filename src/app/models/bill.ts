export class Bill {

  constructor(status: string, payee: string, nickname: string, payment_date: string, recurring_date: number, payment_amount: number, toEdit ?: boolean) {
    this.status = status;
    this.payee = payee;
    this.nickname = nickname;
    this.payment_date = payment_date;
    this.recurring_date = recurring_date;
    this.payment_amount = payment_amount;
    if(toEdit){
      this.toEdit = toEdit;
    }
  }

  status: string;
  payee: string;
  nickname: string;
  payment_date: string;
  recurring_date: number;
  payment_amount: number;
  toEdit?: boolean;
}

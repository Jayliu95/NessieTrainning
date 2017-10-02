export class Account {
  constructor(type: string, nickname: string, rewards: number, balance: number, account_number: string, toEdit ?: boolean){
    this.type = type;
    this.nickname = nickname;
    this.rewards = rewards;
    this.balance = balance;
    this.account_number = account_number;
    if(toEdit){
      this.toEdit = false;
    }
  }
  type: string;
  nickname: string;
  rewards: number;
  balance: number;
  account_number: string;
  toEdit ? : boolean;
}

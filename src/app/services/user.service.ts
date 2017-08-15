import {Injectable} from "@angular/core";
import {Http, Headers, Response, RequestOptions} from "@angular/http";
import {User} from "../models/user";

import {Observable} from 'rxjs/Rx';
import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class UserService{
  constructor(private _http:Http){

  }

  getUsers(){
    return this._http.get('/api/v1/users', this.jwt()).map((response: Response) => response.json());
  }

  getUser(id: number){
    return this._http.get('/api/v1/users/'+id, this.jwt()).map((response: Response) => response.json());
  }

  getUsersByName(name: string){
    return this._http.get('/api/v1/users/names/'+name, this.jwt()).map((response: Response) => response.json());
  }

  createUser(user: User){
    return this._http.post('/api/v1/users', user, this.jwt());
  }

  updateUser(user: User, id: string){
    console.log(user + "\t" + id);
    return this._http.put('/api/v1/users/'+id, user)
      .map(res => console.log(res)) //Switch back to logging in component later
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  deleteUser(id: number){
    return this._http.delete('/api/v1/users/'+id)
      .map((res:Response) => console.log(res))
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  //Functions dealing with portfolio of user
  //TODO: review => delete?use
  //Commenting out function -- dealing with this within component for now
  /*
  getTotalInvest(id: number){
    return this._http.get('/api/v1/users/'+id, this.jwt())
      .map((response: Response) => {
      let userStocks = response['stockPortfolio'];
      let sum = 0;
      for(let index = 0; index<userStocks.length; index++){
        sum += userStocks[index]['purchasePrice'];
      }
      console.log(sum);
      });
  }
  */

  // private helper methods

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }
}

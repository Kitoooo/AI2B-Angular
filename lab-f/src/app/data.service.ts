import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemsList } from './items-list';
import { User} from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor(private http: HttpClient) { }

  public getItems(): Observable<ItemsList>{
    return this.http.get<ItemsList>('https://labjwt.zecer.wi.zut.edu.pl/api/items');
  }

  public getUsers(): Observable<User[]>{
    return this.http.get<User[]>('https://labjwt.zecer.wi.zut.edu.pl/api/users');
  }
}

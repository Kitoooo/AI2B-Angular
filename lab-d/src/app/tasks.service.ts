import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  readonly baseUrl = 'http://localhost:48449/';
  readonly jsonDBname = 'todos';
  constructor(private http: HttpClient) {}

  public index(archived = false): Observable<Task[]> {
    const url = this.baseUrl + this.jsonDBname;
    return this.http.get<Task[]>(url, {
      params: { archived: archived.toString(), _sort: 'id', _order: 'desc' },
    });
  }

  public post(task: Task): Observable<Task> {
    const url = this.baseUrl + this.jsonDBname;
    return this.http.post<Task>(url, task)
  }

  public put(task: Task): Observable<Task> {
    const url = this.baseUrl + this.jsonDBname + '/' + task.id;
    return this.http.put<Task>(url, task)
  }

  public delete(task: Task): Observable<any> {
    const url = this.baseUrl + this.jsonDBname + '/' + task.id;
    return this.http.delete(url)
  }
}

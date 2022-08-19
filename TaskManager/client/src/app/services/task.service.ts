import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  URL: string = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(boardId: string) {
    return this.http.get(this.URL + `/${boardId}`);
  }
}

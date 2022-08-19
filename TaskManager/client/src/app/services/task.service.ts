import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  URL: string = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  addTask(boardId: string, name: string) {
    return this.http.post(this.URL + `/${boardId}`, { name });
  }

  getTasks(boardId: string) {
    return this.http.get(this.URL + `/${boardId}`);
  }
}

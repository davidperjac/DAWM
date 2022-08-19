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

  deleteTask(taskId: string) {
    return this.http.delete(this.URL + `/${taskId}`);
  }

  completeTask(taskId: string) {
    return this.http.put(this.URL + `/${taskId}`, null);
  }

  getTasks(boardId: string) {
    return this.http.get(this.URL + `/${boardId}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  URL: string = 'http://localhost:3000/api/v1/boards';

  constructor(private http: HttpClient) {}

  getBoards(userId: string) {
    return this.http.get(this.URL + `/${userId}`);
  }

  getBoard(boardId: string) {
    return this.http.get(this.URL + `/${boardId}`);
  }

  addBoard(userId: string, name: string, description: string) {
    return this.http.post(this.URL + `/${userId}`, {
      name: name,
      description: description,
    });
  }

  deleteBoard(boardId: string) {
    return this.http.delete(this.URL + `/${boardId}`);
  }
}

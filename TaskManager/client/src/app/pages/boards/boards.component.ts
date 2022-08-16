import { BoardService } from 'src/app/services/board.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Board } from 'src/app/models/board';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css'],
})
export class BoardsComponent implements OnInit {
  public userId: string = '';
  public user: User = {
    userId: '',
    username: '',
    password: '',
  };

  boards: Board[] = [];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private boardService: BoardService
  ) {}

  logout() {
    localStorage.removeItem('token');
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['userId'];
    });
    this.authService.getUser(this.userId).subscribe((res: any) => {
      this.user = res[0] as User;
    });
    this.boardService.getBoards(this.userId).subscribe((res: any) => {
      this.boards = res as any;
    });
  }
}

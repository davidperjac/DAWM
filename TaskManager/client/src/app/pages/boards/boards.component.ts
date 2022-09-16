import { BoardService } from 'src/app/services/board.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Board } from 'src/app/models/board';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

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
    private boardService: BoardService,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  deleteBoard(boardId: string) {
    this.boardService.deleteBoard(boardId).subscribe({
      error: (res) => {
        console.log(res);
        this.toastr.error(res.error);
      },
      next: (res: any) => {
        this.toastr.success(res);
        this.boardService.getBoards(this.userId).subscribe((res: any) => {
          this.boards = res as any;
        });
      },
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['userId'];
    });
    this.authService.getUser(this.userId).subscribe((res: any) => {
      this.user = res[0] as User;
    });
    this.boardService.getBoards(this.userId).subscribe((res: any) => {
      this.boards = res as Board[];
    });
  }
}

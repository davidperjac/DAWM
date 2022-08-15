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

  boards: Board[] = [
    {
      id: 'board1',
      name: 'Work',
      description: 'Workflow',
      completed: 5,
    },
    {
      id: 'board2',
      name: 'Code',
      description: 'React,Angular,Vue',
      completed: 2,
    },
    {
      id: 'board3',
      name: 'Espol',
      description: 'DAWM',
      completed: 3,
    },
    {
      id: 'board4',
      name: 'Home',
      description: 'Soccer match',
      completed: 6,
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
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
  }
}

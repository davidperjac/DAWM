import { BoardService } from 'src/app/services/board.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  public userId: string = '';
  public boardId: string = '';

  tasks = this._formBuilder.group({
    match: false,
    groceries: false,
    flight: false,
  });

  constructor(
    private boardService: BoardService,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['userId'];
      this.boardId = params['boardId'];
    });
    this.boardService.getBoard(this.boardId).subscribe({
      error: (res) => {
        console.log(res);
      },
      next: (res) => {
        console.log(res);
      },
    });
  }
}

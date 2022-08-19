import { BoardService } from 'src/app/services/board.service';
import { TaskService } from 'src/app/services/task.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  public userId: string = '';
  public boardId: string = '';

  tasks: Task[] = [];

  constructor(
    private boardService: BoardService,
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['userId'];
      this.boardId = params['boardId'];
    });
    this.taskService.getTasks(this.boardId).subscribe({
      error: (res) => {
        console.log(res);
      },
      next: (res: any) => {
        console.log(res);
        this.tasks = res as Task[];
      },
    });
  }
}

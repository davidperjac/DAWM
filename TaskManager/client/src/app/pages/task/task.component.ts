import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/task';

import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  public userId: string = '';
  public boardId: string = '';
  taskForm: FormGroup | any;

  loading: boolean = true;
  mode: ProgressSpinnerMode = 'indeterminate';
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private route: ActivatedRoute) {
    this.taskForm = new FormGroup({
      name: new FormControl('Add some fun stuff', [Validators.required]),
    });
  }

  addTask() {
    this.taskService
      .addTask(this.boardId, this.taskForm.get('name').value)
      .subscribe({
        error: (res) => {
          console.log(res);
        },
        next: (res: any) => {
          console.log(res);
        },
      });
  }

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
        this.tasks = res as Task[];
        this.loading = false;
      },
    });
  }
}

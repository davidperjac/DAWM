import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/models/task';

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

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.taskForm = new FormGroup({
      name: new FormControl('Add some fun stuff', [Validators.required]),
    });
  }

  addTask() {
    if (this.taskForm.get('name').value !== '') {
      this.taskService
        .addTask(this.boardId, this.taskForm.get('name').value)
        .subscribe({
          error: (res) => {
            this.toastr.error(res.error);
          },
          next: (res: any) => {
            this.toastr.success(res);
            this.taskService.getTasks(this.boardId).subscribe({
              error: (res) => {
                console.log(res.error);
              },
              next: (res: any) => {
                this.tasks = res as Task[];
              },
            });
          },
        });
    }
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId).subscribe({
      error: (res) => {
        this.toastr.error(res.error);
      },
      next: (res: any) => {
        this.toastr.success(res);
        this.taskService.getTasks(this.boardId).subscribe({
          error: (res) => {
            this.toastr.error(res.error);
          },
          next: (res: any) => {
            this.tasks = res as Task[];
          },
        });
      },
    });
  }

  completeTask(taskId: string) {
    this.taskService.completeTask(taskId).subscribe({
      error: (res) => {
        this.toastr.error(res.error);
      },
      next: (res: any) => {
        this.toastr.success(res);
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
        this.toastr.error(res.error);
      },
      next: (res: any) => {
        this.tasks = res as Task[];
        this.loading = false;
      },
    });
  }
}

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BoardService } from 'src/app/services/board.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css'],
})
export class CreateBoardComponent implements OnInit {
  public userId: string = '';
  boardForm: FormGroup | any;

  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.boardForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  addBoard() {
    if (
      this.boardForm.get('name').value !== '' &&
      this.boardForm.get('description').value !== ''
    ) {
      this.boardService
        .addBoard(
          this.userId,
          this.boardForm.get('name').value,
          this.boardForm.get('description').value
        )
        .subscribe({
          error: (res) => {
            this.toastr.error(res.error);
          },
          next: (res: any) => {
            this.toastr.success(res);
            this.router.navigate([`/boards/${this.userId}`]);
          },
        });
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['userId'];
    });
  }
}

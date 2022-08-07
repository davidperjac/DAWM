import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/models/board';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css'],
})
export class BoardsComponent implements OnInit {
  public url: string = '';

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.url = params['userId'];
    });
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { BoardsComponent } from './pages/boards/boards.component';
import { TaskComponent } from './pages/task/task.component';
import { CreateBoardComponent } from './pages/create-board/create-board.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'boards/:userId',
    component: BoardsComponent,
  },
  {
    path: 'create-board/:userId',
    component: CreateBoardComponent,
  },
  {
    path: 'tasks/:userId/:boardId',
    component: TaskComponent,
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

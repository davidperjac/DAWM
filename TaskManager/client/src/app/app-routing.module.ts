import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CreateBoardComponent } from './pages/create-board/create-board.component';
import { BoardsComponent } from './pages/boards/boards.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { TaskComponent } from './pages/task/task.component';

import { AuthGuard } from './guards/auth.guard';

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
    canActivate: [AuthGuard],
  },
  {
    path: 'create-board/:userId',
    component: CreateBoardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tasks/:userId/:boardId',
    component: TaskComponent,
    canActivate: [AuthGuard],
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/auth/auth.guard';
import { HomeComponent } from './components/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'user',
    loadChildren: () => import('../user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

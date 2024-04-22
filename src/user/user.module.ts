import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgFor, NgIf } from "@angular/common";
import { SidebarComponent } from "./components/sidebar.component";
import { UserComponent } from "./user.component";
import { MaterialModule } from "src/material.module";

const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            { path: '', loadComponent: () => import('./components/dashboard/dashboard.component').then(c => c.DashboardComponent) },
            { path: 'profil', loadComponent: () => import('./components/profil/profil.component').then(c => c.ProfileComponent) },
            { path: 'exercises', loadComponent: () => import('./components/exercise/exercise.component').then(c => c.ExerciseComponent) },
            { path: 'gyms', loadComponent: () => import('./components/gym/gym.component').then(c => c.GymComponent) },
        ]
    },
];

@NgModule({
    declarations: [
        UserComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        SidebarComponent,
        MaterialModule,
        NgFor,
        NgIf
    ],
    exports: [RouterModule]
})
export class UserModule { }
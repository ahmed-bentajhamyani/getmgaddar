import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgFor, NgIf } from "@angular/common";
import { DashboardComponent } from "./components/dashboard.component";
import { ProfileComponent } from "./components/profil.component";
import { ExerciseComponent } from "./components/exercise/exercise.component";
import { GymComponent } from "./components/gym/gym.component";
import { SidebarComponent } from "./components/sidebar.component";
import { UserComponent } from "./user.component";
import { MaterialModule } from "src/material.module";

const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'profil', component: ProfileComponent },
            { path: 'exercises', component: ExerciseComponent },
            { path: 'gyms', component: GymComponent },
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
        ProfileComponent,
        MaterialModule,
        NgFor,
        NgIf
    ],
    exports: [RouterModule]
})
export class UserModule { }
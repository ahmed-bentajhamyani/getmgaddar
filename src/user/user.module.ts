import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgFor, NgIf } from "@angular/common";
import { SidebarComponent } from "./components/sidebar.component";
import { ProfileComponent } from "./components/profil.component";
import { UserComponent } from "./user.component";
import { DashboardComponent } from "./components/dashboard.component";

const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'profil', component: ProfileComponent }
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
        NgFor,
        NgIf
    ],
    exports: [RouterModule]
})
export class UserModule { }
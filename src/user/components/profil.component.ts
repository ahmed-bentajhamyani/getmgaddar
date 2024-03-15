import { NgFor, NgIf, NgSwitch } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { AuthService } from "src/auth/auth.service";
import { User } from "src/user/user";
import { SidebarComponent } from "./sidebar.component";
import { EditProfileInfoComponent } from "./edit-profil-info.component";
import { UserService } from "src/user/user.service";
import { filter, map, tap } from "rxjs";
import { ProfileInfoComponent } from "./profil-info.component";

@Component({
    selector: 'mg-profile',
    standalone: true,
    imports: [
        SidebarComponent,
        ProfileInfoComponent,
        EditProfileInfoComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        NgFor,
        NgIf,
        NgSwitch
    ],
    template: `
    <section class="mt-16 px-10">
        <section class="flex-row flex justify-between items-center space-x-48">
            <div class="">
                <div class="rounded-full shadow-lg p-2 w-52 h-52 mb-4 z-50">
                    <div class="flex justify-center items-center rounded-full w-48 h-48 bg-gray-100 z-50">
                        <img class="rounded-full" src="../../../assets/profil.jpg" alt="" width="208px" />
                    </div>
                </div>

                <div class='mb-8'>
                    <div class="flex justify-start items-center space-x-5 -mb-2">
                        <p class='mb-10 font-bold text-4xl'>{{user.name}}<span *ngIf="user.age !== 0">, {{user.age}}</span></p>
                        <mat-icon aria-hidden="false" aria-label="Example edit icon" class="text-rose-500 cursor-pointer mb-3 scale-150"
                        fontIcon="edit" (click)="switchEdit()"></mat-icon>
                    </div>
                    <p class='text-base text-gray-500'>{{user.email}}</p>
                </div>
            </div>

            <mg-profil-info [user]="user"></mg-profil-info>
        </section>

        <mg-edit-profil-info *ngIf="editProfil" [user]="user"></mg-edit-profil-info>
    </section>
    `,
})
export class ProfileComponent {
    private readonly authService = inject(AuthService);
    private readonly userService = inject(UserService);

    user: User = {
        id: 0,
        email: "",
        name: "Unknown",
        age: 0,
        height: 0,
        weight: 0
    };

    editProfil = false;

    ngOnInit() {
        this.getState();
    }

    getState() {
        this.authService.getAuthState().subscribe((state) => {
            if (state?.email) {
                this.user.email = state?.email;
                this.getUser(this.user.email);
            }
        });
    }

    getUser(email: string) {
        this.userService.getUsers().subscribe(users => {
            const user = users.find(user => user.email == email);
            user ? this.user = user : console.log('User not found!');
        });

        // .pipe(
        //     map((u) => {
        //         const user = u.find(user => user.email == email);
        //         console.log(user)
        //         user ? this.user = user : console.log('User not found!');
        //     })
        // )
    }

    switchEdit() {
        this.editProfil = !this.editProfil;
    }
}
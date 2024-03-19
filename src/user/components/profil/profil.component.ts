import { NgFor, NgIf, NgSwitch } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { AuthService } from "src/auth/auth.service";
import { User } from "src/user/user";
import { SidebarComponent } from "../sidebar.component";
import { EditProfilInfoComponent } from "./edit-profil-info.component";
import { UserService } from "src/user/user.service";
import { filter, map, tap } from "rxjs";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";

@Component({
    selector: 'mg-profile',
    standalone: true,
    imports: [
        SidebarComponent,
        EditProfilInfoComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatDialogModule,
        NgFor,
        NgIf,
        NgSwitch
    ],
    template: `
    <section class="p-6 sm:p-10 space-y-6">
        <div class="flex flex-col space-y-6 md:space-y-0 justify-between">
            <p class="text-4xl font-semibold mb-2">Profil</p>
            <p class="text-gray-600 ml-0.5">Your profil information</p>
        </div>
        <section class="md:flex justify-start items-center space-x-10">
            <div class="rounded-full shadow-lg p-2 w-52 h-52 mb-4 z-50">
                <div class="flex justify-center items-center rounded-full w-48 h-48 bg-gray-100 z-50">
                    <img class="rounded-full" src="../../../assets/profil.jpg" alt="" width="208px" />
                </div>
            </div>

            <div class='mb-8'>
                <div class="flex justify-start items-center space-x-5 -mb-2">
                    <p class='mb-10 font-bold text-4xl'>{{user.name}}<span *ngIf="user.age > 0">, {{user.age}}</span></p>
                    <mat-icon aria-hidden="false" aria-label="Example edit icon" class="text-rose-500 cursor-pointer mb-3 scale-150"
                    fontIcon="edit" (click)="openDialog()"></mat-icon>
                </div>
                <p class='text-base font-light'>{{user.email}}</p>

                <p class="font-medium text-sm">Height : <span class="font-light text-sm">{{user.height ? user.height + ' cm' :
                        'Not yet'}}</span></p>
                <p class="font-medium text-sm">Current weight : <span class="font-light text-sm">{{user.weight ? user.weight + ' kg' :
                        'Not yet'}}</span></p>
                <p class="font-medium text-sm">Target weight : <span class="font-light text-sm">{{user.targetWeight ? user.targetWeight + ' kg' :
                'Not yet'}}</span></p>
            </div>
    </section>
    `,
})
export class ProfileComponent {
    private readonly authService = inject(AuthService);
    private readonly userService = inject(UserService);
    public readonly dialog = inject(MatDialog);

    openDialog() {
        const dialogRef = this.dialog.open(EditProfilInfoComponent, {
            data: this.user,
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    user: User = {
        id: 0,
        email: "",
        name: "Unknown",
        age: 0,
        height: 0,
        weight: 0,
        targetWeight: 0
    };

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
    }
}
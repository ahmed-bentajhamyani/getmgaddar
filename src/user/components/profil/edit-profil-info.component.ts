import { Component, Inject, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { User } from "../../user";
import { UserService } from "../../user.service";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'mg-edit-profil-info',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatDialogModule
    ],
    template: `
    <p mat-dialog-title class="!px-5"> Edit Profil information</p>
    <mat-dialog-content class="mat-typography">
        <form [formGroup]="infoForm" (ngSubmit)="onSubmit()"
            class="grid grid-cols-2 gap-8 place-items-center place-content-center mt-3 py-2 w-full">
            <mat-form-field class="mt-2" appearance="outline">
                <mat-label>Name</mat-label>
                <input matInput type="text" id="name" formControlName="name">
            </mat-form-field>
            <mat-form-field class="mt-2" appearance="outline">
                <mat-label>Age</mat-label>
                <input matInput type="number" id="age" formControlName="age">
            </mat-form-field>
            <mat-form-field class="mt-2" appearance="outline">
                <mat-label>Height</mat-label>
                <input matInput type="number" id="height" formControlName="height">
                <mat-hint>Height in cm</mat-hint>
            </mat-form-field>
            <mat-form-field class="mt-2" appearance="outline">
                <mat-label>Weight</mat-label>
                <input matInput type="number" id="weight" formControlName="weight">
                <mat-hint>Weight in kg</mat-hint>
            </mat-form-field>
            <mat-form-field class="mt-2" appearance="outline">
                <mat-label>Target Weight</mat-label>
                <input matInput type="number" id="target-weight" formControlName="target-weight">
                <mat-hint>Target Weight in kg</mat-hint>
            </mat-form-field>
            <button mat-raised-button mat-dialog-close type="submit"
                class="w-full bg-teal-500 text-white shadow-md mb-3 p-[10px] rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all ease-in-out duration-300"
                [disabled]="infoForm.invalid">Save</button>
        </form>
    </mat-dialog-content>
    `
})
export class EditProfilInfoComponent {
    private readonly userService = inject(UserService);

    constructor(@Inject(MAT_DIALOG_DATA) public user: User) { }

    infoForm: FormGroup = new FormGroup({});

    ngOnInit() {
        console.log(this.user);
        this.infoForm = new FormGroup({
            "name": new FormControl(this.user?.name),
            "age": new FormControl(this.user?.age),
            "height": new FormControl(this.user?.height),
            "weight": new FormControl(this.user?.weight),
            "target-weight": new FormControl(this.user?.targetWeight)
        });
    }

    onSubmit() {

        this.user.name = this.infoForm.get('name')?.value;
        this.user.age = this.infoForm.get('age')?.value;
        this.user.height = this.infoForm.get('height')?.value;
        this.user.weight = this.infoForm.get('weight')?.value;
        this.user.targetWeight = this.infoForm.get('target-weight')?.value;

        this.userService.updateUser(this.user).subscribe()
    }
}
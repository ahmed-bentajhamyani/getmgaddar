import { Component, Input, inject } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { NgFor, NgIf, TitleCasePipe } from "@angular/common";
import { Exercise } from "./exercise";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ExerciseDetailsComponent } from "./exercise-details.component";

@Component({
    selector: 'mg-exercise-card',
    standalone: true,
    imports: [
        MatCardModule,
        NgFor,
        NgIf,
        MatDialogModule,
        TitleCasePipe
    ],
    template: `
    <mat-card class="bg-white !rounded-lg !shadow mt-5">
        <div class="p-4">
            <p (click)="openExerciseDialog()" class="font-bold text-base !mb-0 cursor-pointer" [attr.data-cy]="exercise.name.split(' ').join('-')">{{exercise.name | titlecase }}</p>
            <p *ngIf="exercise.bodyPart" class="font-normal text-md !mb-0">Muscle : <span class="font-light">{{exercise.bodyPart | titlecase}}</span></p>
        </div>
        <img mat-card-image (click)="openExerciseDialog()" src={{exercise.gifUrl}} alt={{exercise.name}} class="w-[300px] cursor-pointer">
        <div class="p-4">
            <p *ngIf="exercise.equipment" class="font-normal text-base !mb-0">Equipment : <span class="font-light">{{exercise.equipment}}</span></p>
            <p *ngIf="exercise.instructions" class="font-normal text-base !mb-0">Instructions : </p>
            <ul class="list-disc px-4">
                <li *ngFor="let instruction of exercise.instructions.slice(0, 2)" class="font-light ">{{instruction}}</li>
                <button (click)="openExerciseDialog()" class="text-sky-500 underline">view more</button>
            </ul>
        </div>
    </mat-card>
    `
})
export class ExerciseCardComponent {
    public readonly dialog = inject(MatDialog);

    @Input()
    exercise!: Exercise;

    openExerciseDialog() {
        this.dialog.open(ExerciseDetailsComponent, {
            data: this.exercise,
        });
    }
}
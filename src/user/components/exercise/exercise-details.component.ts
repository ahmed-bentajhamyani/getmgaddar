import { Component, Inject, Input, inject } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { NgFor, NgIf, TitleCasePipe } from "@angular/common";
import { Exercise } from "./exercise";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: 'mg-exercise-details',
    standalone: true,
    imports: [
        MatCardModule,
        NgFor,
        NgIf,
        MatDialogModule,
        MatIconModule,
        TitleCasePipe
    ],
    template: `
        <button mat-dialog-close class="flex justify-end w-full p-2 outline-none">
            <mat-icon aria-hidden="false" aria-label="Example close icon" fontIcon="close" class="text-2xl"></mat-icon>
        </button>
        <mat-dialog-content class="mat-typography">
            <div class="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-8 mt-6 text-gray-900">
                <img src={{exercise.gifUrl}} alt={{exercise.name}} class=''>
                <div class="flex flex-grow flex-col justify-between px-5 w-full">
                    <p class='text-lg md:text-2xl font-bold !mb-0' data-cy="exercise-name">{{exercise.name | titlecase }}</p>
                    <p class='font-light text-lg'>{{exercise.bodyPart | titlecase}}</p>

                    <div class="pb-2">
                        <p *ngIf="exercise.equipment" class="font-normal text-base !mb-0">Equipment : <span class="font-light">{{exercise.equipment | titlecase}}</span></p>
                        <p *ngIf="exercise.secondaryMuscles" class="font-normal text-base !mb-0">Secondary Muscles : <span *ngFor="let secondaryMuscle of exercise.secondaryMuscles" class="font-light">{{(secondaryMuscle | titlecase) + ''}}</span></p>
                        <p *ngIf="exercise.instructions" class="font-normal text-base !mb-0">Instructions : </p>
                        <ul class="list-disc px-4">
                            <li *ngFor="let instruction of exercise.instructions" class="font-light ">{{instruction}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </mat-dialog-content>
    `
})
export class ExerciseDetailsComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public exercise: Exercise) { }
}
import { Component, Input, inject } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { NgFor, NgIf } from "@angular/common";
import { Exercise } from "./exercise";

@Component({
    selector: 'mg-exercise-card',
    standalone: true,
    imports: [
        MatCardModule,
        NgFor,
        NgIf
    ],
    template: `
    <mat-card class="bg-white !rounded-lg !shadow mt-5">
        <div class="p-4">
            <p class="font-bold text-base !mb-0">{{exercise.name}}</p>
            <p *ngIf="exercise.bodyPart" class="font-normal text-md !mb-0">Muscle : <span class="font-light">{{exercise.bodyPart}}</span></p>
        </div>
        <img mat-card-image src={{exercise.gifUrl}} alt={{exercise.name}}>
        <div class="text-gray-900 p-4">
            <p *ngIf="exercise.equipment" class="font-normal text-base !mb-0">Equipment : <span class="font-light">{{exercise.equipment}}</span></p>
            <!-- <p *ngIf="exercise.secondaryMuscles" class="font-normal text-base !mb-0">Secondary Muscles : <span *ngFor="let secondaryMuscle of exercise.secondaryMuscles" class="font-light">{{secondaryMuscle + ''}}</span></p> -->
            <p *ngIf="exercise.instructions" class="font-normal text-base !mb-0">Instructions : </p>
            <ul class="list-disc px-4">
                <li *ngFor="let instruction of exercise.instructions" class="font-light ">{{instruction}}</li>
            </ul>
        </div>
    </mat-card>
    `
})
export class ExerciseCardComponent {
    @Input()
    exercise!: Exercise;
}
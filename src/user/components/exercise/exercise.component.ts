import { Component, inject } from "@angular/core";
import { ExerciseService } from "./exercise.service";
import { ExerciseCardComponent } from "./exercise-card.component";
import { NgFor } from "@angular/common";
import { Exercise } from "./exercise";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: 'mg-exercice',
    standalone: true,
    imports: [
        ExerciseCardComponent,
        MatButtonToggleModule,
        NgFor
    ],
    template: `
    <section class="p-6 sm:p-10 space-y-6">
        <div class="flex flex-col space-y-6 md:space-y-0 justify-between">
            <p class="text-4xl font-semibold mb-2">Exercises</p>
            <p class="text-gray-600 ml-0.5">Your body workout planner</p>
        </div>
        <form action=""></form>
        <mat-button-toggle-group name="bodyPart" aria-label="body part" value="back" (valueChange)="onSelectionChange($event)">
        <ng-container *ngFor="let bodyPart of bodyPartList">
            <mat-button-toggle value={{bodyPart}}>{{bodyPart}}</mat-button-toggle>
        </ng-container>
        </mat-button-toggle-group>
        <div class="grid md:grid-cols-2 2xl:grid-cols-3 gap-6">
            <ng-container *ngFor="let exercise of exercises">
                <mg-exercise-card [exercise]="exercise"></mg-exercise-card>
            </ng-container>
        </div>
    </section>
    `
})
export class ExerciseComponent {
    private readonly exerciseService = inject(ExerciseService);

    exercises: Exercise[] = [];
    bodyPartList: string[] = [];

    ngOnInit() {
        this.getBodyPartList();
    }

    onSelectionChange(selectedValue: string) {
        console.log('Selected Value:', selectedValue);
        this.getExercices(selectedValue);
    }

    getBodyPartList() {
        this.exerciseService.getBodyPartList().then(res => {
            console.log(res)
            this.bodyPartList = res;
        })
    }

    getExercices(muscle: string) {
        this.exerciseService.getExercices(muscle).then(res => {
            console.log(res)
            this.exercises = res;
        })
    }
}
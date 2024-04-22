import { Component, inject } from "@angular/core";
import { ExerciseService } from "./exercise.service";
import { ExerciseCardComponent } from "./exercise-card.component";
import { NgFor, NgTemplateOutlet } from "@angular/common";
import { Exercise } from "./exercise";
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
    selector: 'mg-exercice',
    standalone: true,
    imports: [
        ExerciseCardComponent,
        MatButtonToggleModule,
        NgFor,
        NgTemplateOutlet
    ],
    template: `
    <section class="p-6 sm:p-10 space-y-6">
        <div class="flex flex-col space-y-6 md:space-y-0 justify-between">
            <p class="text-4xl font-semibold mb-2">Exercises</p>
            <p class="text-gray-600 ml-0.5">Your body workout planner</p>
        </div>
        <mat-button-toggle-group name="bodyPart" aria-label="body part" value="back" (valueChange)="onSelectionChange($event)">
            <ng-container *ngFor="let bodyPart of bodyPartList">
                <mat-button-toggle value={{bodyPart}}>{{bodyPart}}</mat-button-toggle>
            </ng-container>
        </mat-button-toggle-group>

        <ng-template #exercisesNotFound>
            <div class="flex items-center justify-center !mt-60">
                <p class="text-lg whitespace-nowrap" data-cy="failure-msg">No exercise found.</p>
            </div>
        </ng-template>
        <ng-template #exercisesFound>
            <div class="grid md:grid-cols-2 2xl:grid-cols-3 gap-6">
                <ng-container *ngFor="let exercise of exercises">
                    <mg-exercise-card [exercise]="exercise"></mg-exercise-card>
                </ng-container>
            </div>
        </ng-template>
        <ng-container *ngTemplateOutlet="exercises.length > 0 ? exercisesFound : exercisesNotFound"></ng-container>
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
        this.getExercices(selectedValue);
    }

    getBodyPartList() {
        this.exerciseService.getBodyPartList().then(res => {
            this.bodyPartList = res;
        })
    }

    getExercices(muscle: string) {
        this.exerciseService.getExercices(muscle).then(res => {
            this.exercises = res;
        })
    }
}
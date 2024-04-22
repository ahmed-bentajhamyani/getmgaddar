import { Component, inject } from "@angular/core";
import { NgFor, NgIf, NgTemplateOutlet } from "@angular/common";
import { GymCardComponent } from "./gym-card.component";
import { Gym } from "./gym";
import { GymService } from "./gym.service";

@Component({
    selector: 'mg-gym',
    standalone: true,
    imports: [
        NgFor,
        NgIf,
        NgTemplateOutlet,
        GymCardComponent
    ],
    template: `
    <section class="p-6 sm:p-10 space-y-6">
        <div class="flex flex-col space-y-6 md:space-y-0 justify-between">
            <p class="text-4xl font-semibold mb-2">Open Gyms</p>
            <p class="text-gray-600 ml-0.5">Open gyms in US</p>
        </div>

        <ng-template #opnGymsNotFound>
        <div class="flex items-center justify-center !mt-60">
                <p class="text-lg whitespace-nowrap" data-cy="failure-msg">No open-gym found.</p>
            </div>
        </ng-template>
        <ng-template #openGymsFound>
            <div class="grid md:grid-cols-2 2xl:grid-cols-3 gap-6">
                <ng-container *ngFor="let gym of openGyms">
                    <mg-gym-card [gym]="gym"></mg-gym-card>
                </ng-container>
            </div>
        </ng-template>
        <ng-container *ngTemplateOutlet="openGyms.length > 0 ? openGymsFound : opnGymsNotFound"></ng-container>
    </section>
    `
})
export class GymComponent {
    private readonly gymService = inject(GymService);
    openGyms: Gym[] = [];

    ngOnInit() {
        this.getOpenGyms();
    }

    getOpenGyms() {
        this.gymService.getOpenGyms()
            .then(json => {
                this.openGyms = json;
            });
    }
}
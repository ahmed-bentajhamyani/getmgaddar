import { Component, Input, inject } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { NgFor, NgIf } from "@angular/common";
import { Gym } from "./gym";

@Component({
    selector: 'mg-gym-card',
    standalone: true,
    imports: [
        MatCardModule,
        NgFor,
        NgIf
    ],
    template: `
    <mat-card class="bg-white !rounded-lg !shadow mt-5 p-4">
        <div class="">
            <p class="font-bold text-base !m-0">{{gym.location}}, {{gym.province_code1}}, {{gym.postal_code1}}</p>
            <p class='font-light text-md'>{{gym.facility_title}}</p>
        </div>
        <div class="text-gray-900">
            <p *ngIf="gym.pass_type" class="font-bold text-base !m-0">Pass type : <span class="font-normal">{{gym.pass_type}}</span></p>
            <p *ngIf="gym.community_center" class="font-bold text-base !m-0">Community center : <span class="font-normal">{{gym.community_center}}</span>
            </p>
            <p *ngIf="gym.open_gym" class="font-bold text-base !m-0">Open gym : <span class="font-normal">{{gym.open_gym}}</span></p>
            <p *ngIf="gym.group" class="font-bold text-base !m-0">Group : <span class="font-normal">{{gym.group}}</span></p>
        </div>
    </mat-card>
    `
})
export class GymCardComponent {
    @Input()
    gym!: Gym;
}
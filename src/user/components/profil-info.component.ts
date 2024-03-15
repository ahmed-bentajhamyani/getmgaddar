import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { User } from "../user";

@Component({
    selector: 'mg-profil-info',
    standalone: true,
    imports: [],
    template: `
    <section class="bg-white rounded-xl shadow-lg mx-3 mt-5 w-full">
        <p class="font-bold text-2xl px-6 py-2">Profil information</p>
        <hr>
        <div class="grid grid-cols-2 justify-items-start items-center mt-3 px-6 py-2 text-gray-900">
            <img src="../../assets/body.svg" alt="" class="h-[250px] -ml-10">
            <div class="text-base -ml-14">
                <p class="tracking-tight truncate">Email : <span class="font-semibold">{{user.email}}</span></p>
                <p class="tracking-tight truncate">Age : <span class="font-semibold">{{user.age}}</span></p>
                <p class="tracking-tight truncate">Height : <span class="font-semibold">{{user.height}}</span> cm</p>
                <p class="tracking-tight truncate">Weight : <span class="font-semibold">{{user.weight}}</span> kg</p>
            </div>
        </div>
    </section>
    `
})
export class ProfileInfoComponent {
    @Input()
    user!: User;
}
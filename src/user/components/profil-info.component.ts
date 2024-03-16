import { Component, Input } from "@angular/core";
import { User } from "../user";

@Component({
    selector: 'mg-profil-info',
    standalone: true,
    imports: [],
    template: `
    <section class="bg-white rounded-xl shadow-lg mx-3 mt-5 w-full">
        <p class="font-bold text-2xl px-6 py-2">Profil information</p>
        <hr>
        <div class="grid grid-cols-2 justify-items-start items-center px-6 py-2 text-gray-900">
            <img src="../../assets/body.svg" alt="" class="h-[150px] -ml-10 my-3">
            <div class="-ml-14">
                <p class="flex justify-between items-center font-semibold text-2xl tracking-tight truncate"><span>{{user.name}}</span>  <span class="">{{user.age}}</span></p>
                <p class="text-base tracking-tight truncate"><span class="font-semibold">{{user.email}}</span></p>
                <span class="tracking-tight truncate text-gray-400 mr-3">Height : {{user.height}}<span class="font-semibold"></span> cm</span>
                <span class="tracking-tight truncate text-gray-400">Weight : {{user.weight}}<span class="font-semibold"></span> kg</span>
            </div>
        </div>
    </section>
    `
})
export class ProfileInfoComponent {
    @Input()
    user!: User;
}
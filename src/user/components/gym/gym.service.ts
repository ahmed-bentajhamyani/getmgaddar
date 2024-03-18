import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class GymService {
    url: string = '/assets/open-gym.json';

    async getOpenGyms() {
        const res = await fetch(this.url);
        return await res.json();
    }
}
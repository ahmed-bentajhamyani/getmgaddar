import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user';

@Injectable({
    providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const users = [
            { id: 12, email: 'ahmedbentaj710@gmail.com', name: 'Ahmed', age: 21, height: 178, weight: 70, targetWeight: 80 },
            { id: 13, email: 'ahmed-bentaj@outlook.fr', name: 'Bentaj', age: 18, height: 188, weight: 100, targetWeight: 70 }
        ];
        return { users };
    }

    // Overrides the genId method to ensure that a hero always has an id.
    // If the heroes array is empty,
    // the method below returns the initial number (11).
    // if the heroes array is not empty, the method below returns the highest
    // hero id + 1.
    genId(users: User[]): number {
        return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
    }
}
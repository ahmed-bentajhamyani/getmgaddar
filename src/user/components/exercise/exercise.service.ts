import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Exercise } from "./exercise";

@Injectable({
    providedIn: 'root'
})
export class ExerciseService {
    url = 'https://exercisedb.p.rapidapi.com/exercises/';
    headers = new HttpHeaders({
        'X-RapidAPI-Key': '701100e0b7msh92c97be9efb3125p109713jsn3e12c60c7648',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    });

    headersObject: Record<string, string> = {};

    async getBodyPartList(): Promise<string[]> {
        this.headers.keys().forEach(key => {
            this.headersObject[key] = this.headers.get(key) || '';
        });

        try {
            const response = await fetch(this.url + 'bodyPartList', {
                method: 'GET',
                headers: this.headersObject
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        }
    }

    async getExercices(muscle: string): Promise<Exercise[]> {
        this.headers.keys().forEach(key => {
            this.headersObject[key] = this.headers.get(key) || '';
        });

        try {
            const response = await fetch(this.url + 'bodyPart/' + muscle, {
                method: 'GET',
                headers: this.headersObject
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        }
    }
}
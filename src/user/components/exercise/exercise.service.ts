import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ExerciseService {
    async getExercices(muscle: string): Promise<any> {
        const url = 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/';
        const headers = new HttpHeaders({
            'X-RapidAPI-Key': '701100e0b7msh92c97be9efb3125p109713jsn3e12c60c7648',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        });

        const headersObject: Record<string, string> = {};
        headers.keys().forEach(key => {
            headersObject[key] = headers.get(key) || '';
        });

        try {
            const response = await fetch(url + muscle, {
                method: 'GET',
                headers: headersObject
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
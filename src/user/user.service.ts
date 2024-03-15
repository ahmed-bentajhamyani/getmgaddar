import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of, tap } from "rxjs";
import { User } from "./user";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private usersUrl = 'api/users';
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private httpClient: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(this.usersUrl)
            .pipe(
                // tap(_ => this.log('fetched users')),
                catchError(this.handleError<User[]>('getUsers', []))
            );
    }

    getUser(id: number): Observable<User> {
        const url = `${this.usersUrl}/${id}`;
        return this.httpClient.get<User>(url).pipe(
            // tap(_ => this.log(`fetched user id=${id}`)),
            catchError(this.handleError<User>(`getUser id=${id}`))
        );
    }

    addUser(user: User): Observable<User> {
        return this.httpClient.post<User>(this.usersUrl, user, this.httpOptions).pipe(
            // tap((newUser: User) => this.log(`added hero w/ id=${newUser.id}`)),
            catchError(this.handleError<User>('addUser'))
        );
    }

    updateUser(user: User): Observable<any> {
        return this.httpClient.put(this.usersUrl, user, this.httpOptions).pipe(
            // tap(_ => this.log(`updated user id=${user.id}`)),
            catchError(this.handleError<any>('updateUser'))
        );
    }

    /** DELETE: delete the hero from the server */
    // deleteUser(id: number): Observable<User> {
    //     const url = `${this.usersUrl}/${id}`;

    //     return this.httpClient.delete<User>(url, this.httpOptions).pipe(
    //         tap(_ => this.log(`deleted hero id=${id}`)),
    //         catchError(this.handleError<User>('deleteHero'))
    //     );
    // }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}
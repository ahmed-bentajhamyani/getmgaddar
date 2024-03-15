import { NgClass, NgFor, NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";
import { AuthService } from "src/auth/auth.service";

@Component({
    selector: 'mg-sidebar',
    standalone: true,
    imports: [
        MatIconModule,
        NgFor,
        NgIf,
        NgClass
    ],
    template: `
    <aside class="flex flex-col flex-shrink-0 p-3 shadow sticky top-0" style="width: 280px; height: 100vh;">
    
        <a href="/" class="text-center text-4xl font-bold my-3">
            Get Mgaddar
        </a>
        <hr>
        
        <ul class="flex flex-col justify-start items-center w-full flex-grow">
            <li class="w-full mt-2 py-3 rounded-md cursor-pointer transition-all ease-in-out duration-500" (click)="activateClass(1)"
                    [ngClass]="{'text-white bg-rose-500 hover:bg-rose-700' : selectedOne === 1, 'text-gray-800 hover:bg-rose-500 hover:text-white' : selectedOne !== 1}">
                <a routerLink="dashboard" class="flex justify-start items-center mx-3 w-full"><mat-icon class="mr-2" aria-hidden="false" aria-label="Example home icon" fontIcon="home"></mat-icon>
                Dashboard</a>
            </li>

            <li class="w-full mt-2 py-3 rounded-md cursor-pointer transition-all ease-in-out duration-500" (click)="activateClass(2)"
                [ngClass]="{'text-white bg-rose-500 hover:bg-rose-700' : selectedOne === 2, 'text-gray-800 hover:bg-rose-500 hover:text-white' : selectedOne !== 2}">
                <a routerLink="articles" class="flex justify-start items-center mx-3 w-full"><mat-icon class="mr-2" aria-hidden="false" aria-label="Example table_chart icon" fontIcon="table_chart"></mat-icon>
                Profile </a>
            </li>

            <li class="w-full mt-2 py-3 rounded-md cursor-pointer transition-all ease-in-out duration-500" (click)="activateClass(3)"
                    [ngClass]="{'text-white bg-rose-500 hover:bg-rose-700' : selectedOne === 3, 'text-gray-800 hover:bg-rose-500 hover:text-white' : selectedOne !== 3}">
                <a routerLink="dashboard" class="flex justify-start items-center mx-3 w-full"><mat-icon class="mr-2" aria-hidden="false" aria-label="Example home icon" fontIcon="home"></mat-icon>
                Dashboard</a>
            </li>

            <li class="w-full mt-2 py-3 rounded-md cursor-pointer transition-all ease-in-out duration-500" (click)="activateClass(4)"
                [ngClass]="{'text-white bg-rose-500 hover:bg-rose-700' : selectedOne === 4, 'text-gray-800 hover:bg-rose-500 hover:text-white' : selectedOne !== 4}">
                <a routerLink="articles" class="flex justify-start items-center mx-3 w-full"><mat-icon class="mr-2" aria-hidden="false" aria-label="Example table_chart icon" fontIcon="table_chart"></mat-icon>
                Profile </a>
            </li>
        </ul>
        
        <button class="w-full bg-rose-500 text-white shadow-md py-4 rounded-md hover:bg-rose-700 transition-all ease-in-out duration-500" (click)="logout()">Logout</button>
    </aside>
    `,
})
export class SidebarComponent {
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);

    selectedOne = 1;

    activateClass(id: number) {
        this.selectedOne = id;
    }

    logout() {
        this.authService.signout()
            .then(
                () => {
                    console.log('loggedOut')
                    this.router.navigate(['auth/login'])
                }
            );
    }
}
import { Component } from "@angular/core";

@Component({
    selector: 'mg-user',
    template: `
    <mat-drawer-container class="example-container h-screen w-full" autosize>
        <mat-drawer #drawer class="example-sidenav" mode="side" opened>
            <mg-sidebar></mg-sidebar>
        </mat-drawer>

        <div class="example-sidenav-content">
            <mat-toolbar class="flex justify-between items-center w-full">
                <button mat-icon-button class="example-icon" (click)="drawer.toggle()" aria-label="Example icon-button with menu icon">
                    <mat-icon>menu</mat-icon>
                </button>

                <div class="">
                    <button mat-icon-button class="example-icon favorite-icon mx-3" aria-label="Example icon-button with heart icon">
                        <mat-icon>favorite</mat-icon>
                    </button>
                    <button mat-icon-button class="example-icon" aria-label="Example icon-button with share icon">
                        <mat-icon>share</mat-icon>
                    </button>
                </div>
            </mat-toolbar>
            <router-outlet></router-outlet>
        </div>
    </mat-drawer-container>
    `,
})
export class UserComponent { }
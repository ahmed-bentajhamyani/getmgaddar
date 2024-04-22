import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/auth/auth.service";

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

                <div class="example-button-row">
                    <button mat-button color="primary" class="text-sm" (click)="deleteUser()" data-cy="delete-user-btn">Delete account</button>
                </div>
            </mat-toolbar>
            <router-outlet></router-outlet>
        </div>
    </mat-drawer-container>
    `,
})
export class UserComponent {
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);

    deleteUser() {
        this.authService.getAuthState()
            .subscribe((authState) => {
                authState?.delete()
                    .then(_ => this.router.navigate(['/auth/signup']))
                    .catch(e => console.error(e))
            });
    }
}
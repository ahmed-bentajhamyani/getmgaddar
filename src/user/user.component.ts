import { Component, inject } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "src/auth/auth.service";
import { User } from "./user";

@Component({
    selector: 'mg-user',
    template: `
    <section class="flex">
        <mg-sidebar></mg-sidebar>
        <mg-profile></mg-profile>
    </section>
    `,
})
export class UserComponent {
    private readonly authService = inject(AuthService);

    user: User = {
        id: 0,
        email: "",
        name: "Unknown",
        age: 0,
        height: 0,
        weight: 0
    };
    infoForm: FormGroup = new FormGroup({
        height: new FormControl(''),
        weight: new FormControl('')
    });

    ngOnInit() {
        this.getState();
    }

    onSubmit() {

    }

    getState() {
        this.authService.getAuthState().subscribe((state) => {
            if (state?.email) this.user.email = state?.email;
        });
    }
}
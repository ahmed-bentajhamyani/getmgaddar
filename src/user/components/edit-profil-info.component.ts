import { Component, Input, OnChanges, SimpleChanges, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { User } from "../user";
import { UserService } from "../user.service";

@Component({
    selector: 'mg-edit-profil-info',
    standalone: true,
    imports: [
        ReactiveFormsModule,
    ],
    template: `
    <section class="bg-white rounded-xl shadow-lg mt-5">
        <p class="font-bold text-2xl px-6 py-2">Edit Profil information</p>
        <hr>
        <form [formGroup]="infoForm" (ngSubmit)="onSubmit()" class="grid grid-cols-4 gap-8 place-items-end place-content-center mt-3 px-6 py-2 w-full">
            <div>
                <label for="name" class="block text-gray-700 font-medium">Name :</label>
                <input type="text" id="name" formControlName="name"
                class="mt-1 p-2 block w-full border-2 rounded-md focus:outline-none focus:border-teal-500">
            </div>
            <div>
                <label for="age" class="block text-gray-700 font-medium">Age :</label>
                <input type="number" id="age" formControlName="age"
                class="mt-1 p-2 block w-full border-2 rounded-md focus:outline-none focus:border-teal-500">
            </div>
            <div>
                <label for="height" class="block text-gray-700 font-medium">Height <span
                    class="text-sm text-gray-500">(cm)</span> :</label>
                <input type="number" id="height" formControlName="height"
                class="mt-1 p-2 block w-full border-2 rounded-md focus:outline-none focus:border-teal-500">
            </div>
            <div>
                <label for="weight" class="block text-gray-700 font-medium">Weight <span
                    class="text-sm text-gray-500">(kg)</span> :</label>
                <input type="number" id="weight" formControlName="weight"
                class="mt-1 p-2 block w-full border-2 rounded-md focus:outline-none focus:border-teal-500">
            </div>
            <button type="submit"
                class="w-full bg-teal-500 text-white shadow-md mb-3 p-[10px] rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all ease-in-out duration-300"
                [disabled]="infoForm.invalid">Save</button>
        </form>
    </section>
    `
})
export class EditProfileInfoComponent implements OnChanges {
    private readonly userService = inject(UserService);

    @Input()
    user!: User;

    infoForm: FormGroup = new FormGroup({});

    ngOnChanges(changes: SimpleChanges) {
        console.log(this.user);
        if (changes["user"] && this.user) {
            this.infoForm = new FormGroup({
                name: new FormControl(this.user?.name),
                age: new FormControl(this.user?.age),
                height: new FormControl(this.user?.height),
                weight: new FormControl(this.user?.weight)
            });
        }
    }

    onSubmit() {
        this.user.name = this.infoForm.get('name')?.value;
        this.user.age = this.infoForm.get('age')?.value;
        this.user.height = this.infoForm.get('height')?.value;
        this.user.weight = this.infoForm.get('weight')?.value;

        this.userService.updateUser(this.user);
    }
}
import { Component, inject } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { AuthService } from "src/auth/auth.service";
import { UserService } from "../../user.service";
import { User } from "../../user";
import { NgFor, NgIf } from "@angular/common";
import { RouterModule } from "@angular/router";
import { GymCardComponent } from "../gym/gym-card.component";
import { GymService } from "../gym/gym.service";
import { Gym } from "../gym/gym";
import { ExerciseService } from "../exercise/exercise.service";
import { Exercise } from "../exercise/exercise";
import { ExerciseCardComponent } from "../exercise/exercise-card.component";

@Component({
    selector: 'mg-dashboard',
    standalone: true,
    imports: [
        RouterModule,
        MatCardModule,
        MatIconModule,
        ExerciseCardComponent,
        GymCardComponent,
        NgIf,
        NgFor,
    ],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    private readonly authService = inject(AuthService);
    private readonly userService = inject(UserService);
    private readonly exerciseService = inject(ExerciseService);
    private readonly gymService = inject(GymService);

    openGyms: Gym[] = [];

    exercises: Exercise[] = [];

    user: User = {
        id: 0,
        email: "",
        name: "Unknown",
        age: 0,
        height: 0,
        weight: 0,
        targetWeight: 0
    };

    ngOnInit() {
        this.getState();
        this.getExercices('chest');
        this.getOpenGyms();
    }

    getState() {
        this.authService.getAuthState().subscribe((state) => {
            if (state?.email) {
                this.user.email = state?.email;
                this.getUser(this.user.email);
            }
        });
    }

    getUser(email: string) {
        this.userService.getUsers().subscribe(users => {
            const user = users.find(user => user.email == email);
            user ? this.user = user : console.log('User not found!');
        });
    }

    getExercices(muscle: string) {
        this.exerciseService.getExercices(muscle).then(res => {
            this.exercises = res.slice(0, 4);
        })
    }

    getOpenGyms() {
        this.gymService.getOpenGyms()
            .then(json => {
                this.openGyms = json.slice(0, 4);
            });
    }
}
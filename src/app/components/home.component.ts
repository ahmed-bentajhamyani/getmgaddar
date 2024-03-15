import { Component } from "@angular/core";

@Component({
    selector: 'mg-home',
    template: `
    <div class="absolute inset-0 bg-cover bg-center bg-black" style="background-image: url('assets/cover.jpg');"></div>
    <div class="absolute inset-0 flex flex-col justify-center items-center text-white">
        <div class="w-1/2 flex flex-col justify-center items-center">
            <p class="text-8xl font-extrabold text-center uppercase">Find your strength</p>
            <!-- <p class="text-2xl font-bold text-center uppercase">Inside and out...</p> -->
            <div class="flex justify-center items-center space-x-4 w-full mt-10">
                <a routerLink="auth/login"
                    class="w-1/4 bg-rose-500 text-white text-center shadow-md py-4 rounded-md cursor-pointer select-none hover:bg-rose-700 transition-all ease-in-out duration-500">Login</a>
                <a routerLink="auth/signup"
                    class="w-1/4 border-2 border-rose-500 hover:bg-rose-500 text-white text-center shadow-md py-[14px] rounded-md cursor-pointer select-none transition-all ease-in-out duration-500">Sign
                    Up</a>
            </div>
        </div>
    </div>
    `
})
export class HomeComponent { }
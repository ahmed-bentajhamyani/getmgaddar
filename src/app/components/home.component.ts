import { Component } from "@angular/core";

@Component({
    selector: 'mg-home',
    standalone: true,
    template: `
    <div class="relative h-screen">
        <div class="absolute inset-0 bg-cover bg-center bg-black" style="background-image: url('assets/cover.jpg');"></div>
        <div class="absolute inset-0 flex justify-center items-center">
            <div class="w-full max-w-2xl text-white">
                <p class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-extrabold text-center uppercase">Find your strength</p>
                <div class="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mt-10">
                    <a href="auth/login" class="w-1/3 md:w-1/4 bg-rose-500 text-white text-center shadow-md py-4 rounded-md cursor-pointer select-none hover:bg-rose-700 transition-all ease-in-out duration-500" data-cy="login-btn">Login</a>
                    <a href="auth/signup" class="w-1/3 md:w-1/4 border-2 border-rose-500 hover:bg-rose-500 text-white text-center shadow-md mt-4 md:mt-0 py-[14px] rounded-md cursor-pointer select-none transition-all ease-in-out duration-500" data-cy="signup-btn">Sign Up</a>
                </div>
            </div>
        </div>
    </div>
    `
})
export class HomeComponent { }
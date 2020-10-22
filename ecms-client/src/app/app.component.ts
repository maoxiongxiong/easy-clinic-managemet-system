import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Easy Clinic Management System';

    constructor(private jwtHelper:JwtHelperService){}

    public isUserAuthenticated() {
        let token: string = localStorage.getItem("jwt");
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            return true;
        } else {
            return false;
        }
    }

    public isRegistration(){
        if(window.location.pathname.startsWith('/registration')){
            return true;
        } else {
            return false;
        }
    }
}

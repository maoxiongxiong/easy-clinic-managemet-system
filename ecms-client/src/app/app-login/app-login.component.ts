import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
    selector: 'app-login',
    templateUrl: './app-login.component.html',
    styleUrls: ['./app-login.component.scss']
})
export class LoginComponent implements OnInit {
    invalidLogin: boolean;
    error: string;

    constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) { }

    ngOnInit() {
        let token: string = localStorage.getItem("jwt");
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            this.router.navigate(["/"]);
        }
    }

    login(form: NgForm) {
        let credentials = JSON.stringify(form.value);
        //console.log(credentials);
        this.http.post("api/auth/login", credentials, {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        }).subscribe(response => {
            let token = (<any>response).token;
            localStorage.setItem("jwt", token);
            this.invalidLogin = false;
            this.router.navigate(["/"]);
        }, err => {
            this.invalidLogin = true;
            if(err.status === 401){
                this.error = 'Invalid username or password.';
            } else {
                this.error = 'Error ' + err.status + ': ' + err.error.message;
            }
            console.log(err);
        });
    }
}

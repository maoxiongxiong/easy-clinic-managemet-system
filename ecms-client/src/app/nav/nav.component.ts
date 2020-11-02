import { Component, OnInit } from '@angular/core';
import { JWTService } from '../_services/jwt-service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    constructor(private jwtService: JWTService) { }

    ngOnInit(): void {
    }

    logout(): void {
        this.jwtService.logout();
    }

    userIsAdmin(): boolean {
        return this.jwtService.userIsAdmin();
    }
}

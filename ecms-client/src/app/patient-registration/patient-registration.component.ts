import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user-service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-patient-registration',
    templateUrl: './patient-registration.component.html',
    styleUrls: ['./patient-registration.component.scss']
})
export class PatientRegistrationComponent implements OnInit {

	uniqueName: boolean = true;
	error: string;

    constructor(private userService: UserService, private router: Router) { }

    ngOnInit(): void {
    }

	passwordToShort(password): boolean {
		if(password.length < 8){
			return true;
		} else {
			return false;
		}
	}

	passwordNotMatch(password, respassword): boolean {
		if(password !== respassword){
			return true;
		} else {
			return false;
		}
	}

    registUser(form: NgForm) {
		let data=form.value;
		if(!this.passwordToShort(data.password)){
			if(!this.passwordNotMatch(data.password, data.repassword)){
				this.userService.nameIsFree(data.userName).subscribe((response)=>{
					if(!response){
						this.uniqueName = false;
					}else{
						let createdUser= this.userService.createUser(data);
						createdUser.subscribe((response) => {
							this.router.navigate(['login']);
						}, err => {
							this.error = 'Error ' + err.status + ': ' + err.error.message;
							console.log(err);
						});
					}
				},err=>{
					this.error = 'Error ' + err.status + ': ' + err.error.message;
					console.log(err);
				})
			}
		}
		this.uniqueName = true;
		this.error = undefined;
	}


}

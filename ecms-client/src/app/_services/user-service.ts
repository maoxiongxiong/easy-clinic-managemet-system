import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class UserService{

	private headerJson:HttpHeaders;

	constructor(private http: HttpClient) { 
		this.headerJson= new HttpHeaders({
			"Content-Type": "application/json"
		});
	}

	createUser(data):Observable<boolean>{
		delete data.repassword;
		let credentials = JSON.stringify(data);
		return this.http.post<boolean>('/api/patients/create', credentials, {
			headers: this.headerJson
		});
	}

	nameIsFree(userName):Observable<boolean>{
		return this.http.get<boolean>('api/patients/free/' + userName,{
			headers: this.headerJson
		});
	}
}
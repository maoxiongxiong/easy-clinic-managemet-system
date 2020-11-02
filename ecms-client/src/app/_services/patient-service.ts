import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class PatientService{

	private headerJson:HttpHeaders;

	constructor(private http: HttpClient) { 
		this.headerJson= new HttpHeaders({
			"Content-Type": "application/json"
		});
	}

	createUser(data, file = null):Observable<boolean>{
		delete data.repassword;
		return this.http.put<boolean>('/api/patients/create', file, {params : data});
	}

	nameIsFree(userName):Observable<boolean>{
		return this.http.get<boolean>('api/patients/free/' + userName,{
			headers: this.headerJson
		});
	}
}
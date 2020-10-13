import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
	
	constructor(){}

	intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
		let token = localStorage.getItem("jwt");
		request=request.clone({
			setHeaders: {
				"Authorization": "Bearer " + token,
			},
			url: this.getUrl(request.url)
		});
		return next.handle(request);
	}

	private getUrl(url: string): string {
		if(url.startsWith('api')){
			let loc = window.location
			url = (environment.production ? loc.origin : loc.protocol + '//' + loc.hostname + ':' + environment.serverPort + '/') + url;
		}
		return url;
	}
}
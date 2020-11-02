import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackenInterceptor implements HttpInterceptor{

    constructor(){}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const { url, method, headers, body, params } = request;
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/auth/login') && method === 'POST': {
                    let content = JSON.parse(body)
                    switch(content.userName){
                        case 'valid' : return ok({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJyb2xlIjoidXNlciIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.mnh70acuKGZnYKF9NvNM9POryP4FD62p9FbSXC63MtA'});
                        case 'error' : return error();
                        default:
                            return unauthorized();
                    }
                }
                case url.includes('/patients/free/') && method === 'GET': {
                    let path = url.split('/');
                    let name = path[path.length - 1]
                    switch(name){
                        case 'included' : return ok(false);
                        case 'error' : return error();
                        default:
                            return ok(true)
                    }
                }
                case url.endsWith('/patients/create') && method === 'PUT': {
                    switch(params.get('userName')){
                        case 'error' : return error();
                        default:
                            return ok(true);
                    }
                }
                default: return next.handle(request);
            }
        }

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function error() {
            return throwError({ status: 500, error: { message: 'Something is happened, this is sad.' } });
        }
	}
}
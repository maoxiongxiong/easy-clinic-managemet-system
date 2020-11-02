import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './app-login/app-login.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { AuthGuard } from './_guards/auth-guard';
import { TokenInterceptor } from './_interceptors/token-interceptor';
import { FormsModule } from '@angular/forms';
import { FakeBackenInterceptor } from './_interceptors/fake-backend-interceptor';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { OutsiderGuard } from './_guards/outsider-guard';
import { PatientService } from './_services/patient-service';
import { JWTService } from './_services/jwt-service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        NavComponent,
        PatientRegistrationComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        JwtModule.forRoot({
            config:{
                throwNoTokenError: false,
                tokenGetter: getToken,
                allowedDomains: ["localhost:44396"]
            }
        })
    ],
    providers: [
        JwtHelperService,
        AuthGuard,
        OutsiderGuard,
        PatientService,
        JWTService,
        HttpClient,
        {	
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: FakeBackenInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

export function getToken(){
    return localStorage.getItem("currentUser");
}
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import firebase packages
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// File imports
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { LoginComponent } from 'src/app/core/auth/login/login.component';
import { SignupComponent } from 'src/app/core/auth/signup/signup.component';
import { HomeComponent } from 'src/app/core/home/home.component';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { NavbarComponent } from './core/navbar/navbar.component';
import { MovieThumbnailComponent } from './core/movie-thumbnail/movie-thumbnail.component';

const { firebaseConfig } = environment;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NavbarComponent,
    MovieThumbnailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [HttpService, AuthService, ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecordDetailsService } from './shared/recordDetails.service';
import { SpinnerOverlayComponent } from './components/spinner-overlay/spinner-overlay.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LaunchDetailsComponent } from './components/launch-details/launch-details.component';
import { LoaderInterceptor } from './interceptors/loader-interceptor.service';
import { LoaderService } from './shared/loader.service';
import { MyLoaderComponent } from './components/my-loader/my-loader.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LaunchDetailsComponent,
    SpinnerOverlayComponent,
    MyLoaderComponent
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'serverApp'
    }),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [RecordDetailsService, LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [SpinnerOverlayComponent]
})

export class AppModule { }

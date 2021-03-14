import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  AngularFireAnalyticsModule, ScreenTrackingService,
  UserTrackingService, COLLECTION_ENABLED
} from '@angular/fire/analytics';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SocialComponent } from './social/social.component';
import { LangSelectComponent } from './lang-select/lang-select.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ActivitiesComponent } from './activities/activities.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MenuComponent } from './menu/menu.component';
import { LangLoaderComponent } from './lang-loader/lang-loader.component';
import { ConsentBannerComponent } from './consent-banner/consent-banner.component';
import { AnalyticsService } from './services/analytics.service';

export function getConsent(cookieService: CookieService): boolean {
  return cookieService.get(AnalyticsService.consentConfirmedCookieName) == true.toString();
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SocialComponent,
    LangSelectComponent,
    FooterComponent,
    HomeComponent,
    ActivitiesComponent,
    AboutComponent,
    NotFoundComponent,
    MenuComponent,
    LangLoaderComponent,
    ConsentBannerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularSvgIconModule.forRoot(),
    NgSelectModule,
    AngularFireAnalyticsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'uk' },
    { provide: COLLECTION_ENABLED, useFactory: getConsent, deps: [CookieService] },
    ScreenTrackingService,
    UserTrackingService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
    LangLoaderComponent
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
    NgSelectModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'uk' }],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ActivitiesComponent } from './activities/activities.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const homePath: string = "home";
export const activitiesPath: string = "activities";
export const aboutPath: string = "about";

const routes: Routes = [
  { path: homePath, component: HomeComponent },
  { path: activitiesPath, component: ActivitiesComponent },
  { path: aboutPath, component: AboutComponent },
  { path: "", pathMatch: "full", redirectTo: homePath },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

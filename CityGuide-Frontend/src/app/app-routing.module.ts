import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityDetailComponent } from "./city/cityDetail/cityDetail.component";
import { CityAddComponent } from './city/cityAdd/cityAdd.component';
import { RegisterComponent } from './register/register.component';
import { CityComponent } from "./city/city.component";

const appRoutes: Routes = [
  { path: "city", component: CityComponent },
  { path: "cityDetail/:cityId", component: CityDetailComponent },
  { path: "cityAdd", component: CityAddComponent},
  { path: "register", component: RegisterComponent},
  { path: "**", redirectTo: "city", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule ]
})
export class AppRoutingModule { }

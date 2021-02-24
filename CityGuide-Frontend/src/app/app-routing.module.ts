import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityDetailComponent } from "./city/cityDetail/cityDetail.component";
import { CityAddComponent } from './city/cityAdd/cityAdd.component';
import { RegisterComponent } from './register/register.component';
import { CityComponent } from "./city/city.component";
import { AuthGuardService } from './services/auth-guard.service';

const appRoutes: Routes = [
  { path: "cities", component: CityComponent },
  { path: "cityDetail/:cityId", component: CityDetailComponent },
  { path: "cityAdd", component: CityAddComponent, canActivate:[AuthGuardService] },
  { path: "register", component: RegisterComponent},
  { path: "**", redirectTo: "city", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule ]
})
export class AppRoutingModule { }

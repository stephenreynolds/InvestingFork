import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AdviserComponent} from './adviser/adviser.component';
import {ApiAuthorizationModule} from "../api-authorization/api-authorization.module";
import {PaperTradingModule} from "../paper-trading/paper-trading.module";
import {ErrorsModule} from "../errors/errors.module";
import {NotFoundComponent} from "../errors/not-found/not-found.component";

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'adviser', component: AdviserComponent },
  { path: 'paper', loadChildren: () => import('./../paper-trading/paper-trading.module').then(m => m.PaperTradingModule) },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ApiAuthorizationModule,
    ErrorsModule,
    PaperTradingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

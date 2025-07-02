import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { Eap0001scr01Component } from './eap0001/eap0001scr01/eap0001scr01.component';
import { Eap0001TabComponent } from './eap0001/eap0001tab/eap0001-tab.component';
import { Eap0003scr01Component } from './eap0003/eap0003scr01/eap0003scr01.component';
import { OsrAppsupportComponent } from './osr-appsupport/osr-appsupport.component';
import { RulesDetailComponent } from './osr-appsupport/rules-detail/rules-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainMenuComponent,
    children: [
      { path: 'eap0001', component: Eap0001scr01Component },
      { path: 'eap0001Tab', component: Eap0001TabComponent },
      { path: 'eap0003', component: Eap0003scr01Component },
      { path: 'osr-appsupport', component: OsrAppsupportComponent },
      { path: 'rules-detail', component: RulesDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

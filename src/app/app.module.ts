import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Eap0001scr01Component } from './eap0001/eap0001scr01/eap0001scr01.component';
import {
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDatepickerI18n,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ThaiDateParserFormatter } from './thai-datepicker-formatter';
import { ThaiDatepickerI18n } from './thai-datepicker-i18n';
import { DatePickerAdapter } from './datepicker-adapter';
import { Eap0001scr02Component } from './eap0001/eap0001scr02/eap0001scr02.component';
import { Eap0001TabComponent } from './eap0001/eap0001tab/eap0001-tab.component';
import { RadioComponent } from './_component/radio/radio.component';
import { CheckboxComponent } from './_component/checkbox/checkbox.component';
import { Eap0001scr03Component } from './eap0001/eap0001scr03/eap0001scr03.component';
import { AddEditAddressComponent } from './eap0001/collection/add-edit-address/add-edit-address.component';
import { DateMaskDirective } from './date-mask.directive';
import { AlertDialogComponent } from './_component/alert-dialog/alert-dialog.component';
import { OccupationLookupComponent } from './lookup/occupation-lookup/occupation-lookup.component';
import { Eap0001scr04Component } from './eap0001/eap0001scr04/eap0001scr04.component';
import { Eap0001scr05Component } from './eap0001/eap0001scr05/eap0001scr05.component';
import { PlanLookupComponent } from './lookup/plan-lookup/plan-lookup.component';
import { LoanContractLookupComponent } from './lookup/loan-contract-lookup/loan-contract-lookup.component';
import { Eap0001scr06Component } from './eap0001/eap0001scr06/eap0001scr06.component';
import { Eap0001scr07Component } from './eap0001/eap0001scr07/eap0001scr07.component';
import { Eap0001scr08Component } from './eap0001/eap0001scr08/eap0001scr08.component';
import { Eap0001scr09Component } from './eap0001/eap0001scr09/eap0001scr09.component';
import { Eap0003scr01Component } from './eap0003/eap0003scr01/eap0003scr01.component';
import { DatatableDirective } from './datatable.directive';
import {
  NgSelectModule,
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
  NgSelectComponent,
} from '@ng-select/ng-select';
import { DatatableComponent } from './_component/datatable/datatable.component';
import { OsrAppsupportComponent } from './osr-appsupport/osr-appsupport.component';
import { RulesDetailComponent } from './osr-appsupport/rules-detail/rules-detail.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    DateMaskDirective,
    DatatableDirective,
    AppComponent,
    LoginComponent,
    MainMenuComponent,
    Eap0001scr01Component,
    // DatatableComponent,
    Eap0001scr02Component,
    Eap0001TabComponent,
    RadioComponent,
    CheckboxComponent,
    Eap0001scr03Component,
    AddEditAddressComponent,
    AlertDialogComponent,
    OccupationLookupComponent,
    Eap0001scr04Component,
    Eap0001scr05Component,
    PlanLookupComponent,
    LoanContractLookupComponent,
    Eap0001scr06Component,
    Eap0001scr07Component,
    Eap0001scr08Component,
    Eap0001scr09Component,
    Eap0003scr01Component,
    OsrAppsupportComponent,
    RulesDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NgSelectModule,
    NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgSelectComponent,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: NgbDatepickerI18n, useClass: ThaiDatepickerI18n },
    { provide: NgbDateParserFormatter, useClass: ThaiDateParserFormatter },
    { provide: NgbDateAdapter, useClass: DatePickerAdapter },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
   CommonModule
} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { SohoComponentsModule } from 'ids-enterprise-ng';
import { WizardDemoComponent } from './wizard/wizard.demo';
import { M3OdinModule } from "@infor-up/m3-odin-angular";
import { LocaleInitializerModule } from "./locale-initializer/locale-initializer.module";
import { AddCustomerComponent } from './wizard/customer/add-customer/add-customer.component';
import { VehiculeComponent } from './wizard/vehicule/vehicule.component';
import { AddVehiculeComponent } from './wizard/vehicule/add-vehicule/add-vehicule.component';
import { GarantitVehiculeComponent } from './wizard/vehicule/garantit-vehicule/garantit-vehicule.component';
import { CompteurVehiculeComponent } from './wizard/vehicule/compteur-vehicule/compteur-vehicule.component';
import { InspectionComponent } from './wizard/inspection/inspection.component'
import { DetailsInspectionComponent } from './wizard/details-inspection/details-inspection.component';;
import { ObservationComponent } from './wizard/details-inspection/observation/observation.component';
import { QualiteComponent } from './wizard/details-inspection/qualite/qualite.component';
import { ReceptionComponent } from './wizard/details-inspection/reception/reception.component';
@NgModule({
   declarations: [
      AppComponent,
      WizardDemoComponent,
      AddVehiculeComponent,
      AddCustomerComponent,
      VehiculeComponent,
      GarantitVehiculeComponent,
      CompteurVehiculeComponent,
      InspectionComponent,
      DetailsInspectionComponent,
      QualiteComponent,
      ReceptionComponent,
      ObservationComponent,
      VehiculeComponent,
   ],




   imports: [
      AppRoutingModule,
      BrowserModule,
      CommonModule,
      FormsModule,
      HttpClientModule,
      ReactiveFormsModule,
      SohoComponentsModule,
      M3OdinModule,
      LocaleInitializerModule

   ],
   providers: [
      WizardDemoComponent,
      GarantitVehiculeComponent,
      AddCustomerComponent
   ],
   entryComponents: [
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { MIRecord } from '@infor-up/m3-odin';
import { SohoWizardComponent, SohoToastService } from 'ids-enterprise-ng';
import { VehiculeServiceService } from 'src/app/wizard/vehicule/VehiculeService/vehicule-service.service';

@Component({
   selector: 'demo-wizard-demo',
   templateUrl: 'wizard.demo.html',
})
export class WizardDemoComponent {
   @ViewChild(SohoWizardComponent, { static: true }) wizard!: SohoWizardComponent;
   @Output() newItemEventSend = new EventEmitter<MIRecord>();
   customerIsSelected = false;
   selectboolean = false;
   InspectionIsSelected = false;
   currentVehculeSelected;
   VehiculeIsSelected = false
   currentItemSelected = null;
   inspec = null;

   constructor(private VehiculeServiceService: VehiculeServiceService, private toastService: SohoToastService) { }
   ngOnChanges(changes) {
      this.ReciveSelectedVehicule(changes)
   }
   onBeforeActivated(e: SohoWizardEvent) { }
   onActivated(e: SohoWizardEvent) { }
   onAfterActivated(e: SohoWizardEvent) { }


   ifInspectionSelected(data) {

      this.InspectionIsSelected = data;
   }
   ifvehiculeSelected(data) {
      this.VehiculeIsSelected = data;
   }
   ReciveIspectionSelected(event) {
      if (event.length > 0) {
         this.inspec = event;
      } else {
         this.InspectionIsSelected = false;
      }
   }
   ReciveSelectedVehicule(event) {
      this.currentVehculeSelected = event;

      if (event) {
         this.VehiculeIsSelected = true;
      }
      else {
         this.VehiculeIsSelected = false;
      }
   }


}

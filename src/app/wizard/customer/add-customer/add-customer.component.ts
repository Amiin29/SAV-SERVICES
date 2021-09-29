import { Component, OnInit } from '@angular/core';
import { IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService } from '@infor-up/m3-odin-angular';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ColorService } from 'src/app/color.service';
import { VehiculeServiceService } from 'src/app/wizard/vehicule/VehiculeService/vehicule-service.service';

@Component({
   selector: 'app-add-customer',
   templateUrl: './add-customer.component.html',
   styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
   clickEventsubscription: Subscription;
   isDetailBusy = false;
   isBusy = false;
   display = false;
   detailItem: any;
   Custmername: string;
   Adresse1: string;
   Adresse2: string
   codePostale: string;
   MobileNumber: string;
   num2: string;
   FaxNumber: string;
   Email: string;
   Compagnie: string;
   ValueOfCountrySelected: any
   ValueOfAreaSelected: any;
   CUNO: any
   items: any[] = [];
   Area: any[] = [];
   countrys: any[] = [];
   myForm: FormGroup;
   Code_Postale: FormControl;
   Telephone: FormControl;
   NumeroFaxe: FormControl;
   E_mail: FormControl;
   constructor(private VehiculeServiceService: VehiculeServiceService, private mycolor: ColorService, private miService: MIService) {
      this.clickEventsubscription = this.mycolor.getAddCustomer().subscribe(() => {
         this.AddCustomer()
      })
   }
   ngOnDestroy(): void {
      this.clickEventsubscription.unsubscribe()
   }
   ngOnInit(): void {
      (document.getElementById("sendbutton") as HTMLButtonElement).disabled = true
      this.GetAllCountrys();
      this.Code_Postale = new FormControl('', [Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(4)]);
      this.Telephone = new FormControl('', [Validators.pattern('[0-9]*'), Validators.minLength(8), Validators.maxLength(8), Validators.required]);
      this.NumeroFaxe = new FormControl('', [Validators.pattern('[0-9]*'), Validators.minLength(8), Validators.maxLength(8)]);
      this.E_mail = new FormControl('', [Validators.pattern('[a-zA-Z]*@[a-zA-Z]*[.][a-z]*'), Validators.minLength(10), Validators.maxLength(50), Validators.required]);
      this.myForm = new FormGroup
         ({
            'Code_Postale': new FormControl('', [Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(4)]),
            'Telephone': new FormControl('', [Validators.pattern('[0-9]*'), Validators.minLength(8), Validators.maxLength(8), Validators.required]),
            'NumeroFaxe': new FormControl('', [Validators.pattern('[0-9]*'), Validators.minLength(8), Validators.maxLength(8)]),
            'E_mail': new FormControl('', [Validators.pattern('[a-zA-Z]*@[a-zA-Z]*[.][a-z]*'), Validators.minLength(10), Validators.maxLength(50), Validators.required]),
         });
   }
   private setBusy(isBusy: boolean, isDetail?: boolean) {
      isDetail ? this.isDetailBusy = isBusy : this.isBusy = isBusy;
   }
   AddCustomer() {
      const inputRecord = new MIRecord();
      const request: IMIRequest =
      {
         program: 'CRS610MI',
         transaction: 'Add',
         outputFields: ['CUNO'],
         record: inputRecord,
      };
      inputRecord.setString("CUTM", 'C000');
      inputRecord.setString("CUNM", this.Custmername);
      inputRecord.setString("CUA1", this.Adresse1);
      inputRecord.setString("CUA2", this.Adresse2);
      inputRecord.setString("CSCD", this.ValueOfCountrySelected);
      inputRecord.setString("PONO", this.codePostale);
      inputRecord.setString("ECAR", this.ValueOfAreaSelected);
      inputRecord.setString("PHNO", this.MobileNumber);
      inputRecord.setString("TFNO", this.FaxNumber);
      inputRecord.setString("MAIL", this.Email);
      inputRecord.setString("TOWN", this.ValueOfAreaSelected);
      inputRecord.setString("STAT", '20');
      this.mycolor.setNameCustomer(this.Custmername)
      this.mycolor.setMobileCustomer(this.MobileNumber)
      this.mycolor.setAreaCustomer(this.ValueOfAreaSelected)
      this.mycolor.setAdresse(this.Adresse1)
      request.record = inputRecord;
      this.setBusy(true, true);
      request.record = inputRecord;
      this.miService.execute(request).subscribe((response: IMIResponse) => {
         this.setBusy(false, true);
         if (!response.hasError()) {
            this.CUNO = response['item']['CUNO']
            this.UpdateCustomerVehicule()
            this.detailItem = response.item;
            this.setBusy(false, true); // loading
            this.mycolor.setCUNO(this.CUNO)
         }
         else {
            this.detailItem = undefined;
         }
      }, (error) => {
         this.setBusy(false, true);
         this.detailItem = undefined;
      });
   }
   UpdateCustomerVehicule() {
      const inputRecord = new MIRecord();
      const request: IMIRequest =
      {
         program: 'MMS240MI',
         transaction: 'Upd',
         outputFields: ['CUNO', 'SERN'],
         record: inputRecord,
      };
      inputRecord.setString("ITNO", this.VehiculeServiceService.GetCodeVehicule());
      inputRecord.setString("SERN", this.VehiculeServiceService.getSERN());
      inputRecord.setString("CUNO", this.CUNO);
      console.log(this.VehiculeServiceService.GetCodeVehicule() + this.VehiculeServiceService.getSERN() + this.CUNO)
      request.record = inputRecord;
      this.setBusy(true, true);
      request.record = inputRecord;
      this.miService.execute(request).subscribe((response: IMIResponse) => {
         this.setBusy(false, true);
         if (!response.hasError()) {
            console.log(response.items)
            this.detailItem = response.item;
            this.setBusy(false, true); // loading
         }
         else {
            this.detailItem = undefined;
         }
      }, (error) => {
         this.setBusy(false, true);
         this.detailItem = undefined;
      });
   }
   //-------------------------------chargement de Ville----------------------------------------
   GetAllStates(ville: string) {
      const inputRecord = new MIRecord();
      inputRecord.setString('CSCD', ville);
      const request: IMIRequest =
      {
         program: "CRS046MI",
         transaction: "LstAreaCodes",
         outputFields: ["ECAR", "TX15", "TX40"]
      };
      request.record = inputRecord;
      this.setBusy(true);
      this.miService.execute(request).subscribe((response: IMIResponse) => {
         this.setBusy(false);
         if (!response.hasError()) {
            this.Area = response.items;
            this.ValueOfAreaSelected = 'TU';
         }
         else {
         }
      }, (response) => {
         this.setBusy(false);
      });
   }
   //-------------------------------chargement de Pays----------------------------------------
   GetAllCountrys() {
      const inputRecord = new MIRecord();
      inputRecord.setString("CONO", "860");
      const request: IMIRequest =
      {
         program: "CRS045MI",
         transaction: "LstCountry",
         outputFields: ["CONO", "CSCD", "TX40"]
      };
      this.setBusy(true);
      this.miService.execute(request).subscribe((response: IMIResponse) => {
         this.setBusy(false);
         if (!response.hasError()) {
            this.countrys = response.items;
            this.ValueOfCountrySelected = 'TN';
            this.GetAllStates(this.ValueOfCountrySelected)
         }
         else { }
      }, (response) => {
         this.setBusy(false);
      });
   }
   onChangeCountry(event): void {
      this.ValueOfCountrySelected = event;
      this.GetAllStates(event)
   }
   onChangeState(event): void {
      this.ValueOfAreaSelected = event;
   }
   handleinput() {
      if (this.myForm.valid) {
         (document.getElementById("sendbutton") as HTMLButtonElement).disabled = false
      }
      else {
         (document.getElementById("sendbutton") as HTMLButtonElement).disabled = true
      }
   }
}

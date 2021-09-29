import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class VehiculeServiceService {
   private subject = new Subject<any>();
   CustomerNumber = null;
   SERN = ''
   MatriculeVI = null;
   ChassiVI = null;
   CodeVehicule = null;
   constructor() { }
   SetSERN(SERN) {
      this.SERN = SERN;
   }
   getSERN() {
      return this.SERN
      console.log(this.SERN)
   }
   getAddVehicule(): Observable<any> {
      return this.subject.asObservable();

   }
   sendEventAddVehicule(): Promise<any> {
      return new Promise((resolve, reject) => {
         resolve(this.subject.next());
      });
   }

   GetCustomerNumber() {
      return this.CustomerNumber;
   }
   SetCustomerNumber(CustomerNumber) {
      this.CustomerNumber = CustomerNumber;;
   }

   GetMatriculeVI() {
      return this.MatriculeVI;
   }
   SetMatriculeVI(MatriculeVI) {
      this.MatriculeVI = MatriculeVI;;
   }

   GetChassiVI() {
      return this.ChassiVI;
   }
   SetChassiVI(ChassiVI) {
      this.ChassiVI = ChassiVI;;
   }
   GetCodeVehicule() {
      return this.CodeVehicule;
   }
   SetCodeVehicule(CodeVehicule) {
      this.CodeVehicule = CodeVehicule;;
   }
}

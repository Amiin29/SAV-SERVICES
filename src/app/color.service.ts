import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import { IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
@Injectable({
   providedIn: 'root'
})
export class ColorService {

   Tab: any[] | undefined = [];
   TabStat: any[] | undefined = [];
   Tab2: any[] | undefined = [];
   Tab3: any[] | undefined = [];
   DataStatus: any[] | undefined = [];
   Orders: any[] = [];
   private subject = new Subject<any>();
   CUNO = '';
   NCUNO = ''
   CUNM = ''
   objet = {
      number: ""
   }
   tel = ''
   ville = ''
   Adresse = ''
   CurrentYear = new Date().getFullYear();
   Month: number
   theme =
      {
         color: '',
         name: '',
         id: '',
         desc: '',
         date: '',
         type: '',
         description: '',
         heure: '',
         tel: ''
      }
   constructor(private miService: MIService, private userService: UserService) { }
   getNameCustomer() {
      return this.CUNM
   }
   setNameCustomer(CUNM) {
      this.CUNM = CUNM
   }

   getAdresse() {
      return this.Adresse
   }
   setAdresse(Adresse) {
      this.Adresse = Adresse
   }
   setNewCUNO(NCUNO) {
      this.NCUNO = NCUNO
   }
   getNewCUNO() {
      return this.NCUNO
   }
   setMobileCustomer(tel) {
      this.tel = tel
   }
   getMobileCustomer() {
      return this.tel
   }
   setAreaCustomer(ville) {
      this.ville = ville
   }
   getAreaCustomer() {
      return this.ville
   }
   setID(id) {
      this.theme.id = id
   }
   getID() {
      return this.theme.id
   }
   setCUNO(CUNO) {
      this.CUNO = CUNO
      this.objet.number = CUNO
   }
   getobbjet() {
      console.log(this.objet);

      return this.objet.number
   }
   getobbjet2() {

      return this.objet
   }
   getCUNO() {
      return this.CUNO
   }
   setdesc(desc) {
      this.theme.desc = desc
   }
   getdesc() {
      return this.theme.desc
   }
   setNom(name) {
      this.theme.name = name
   }
   getNom() {
      return this.theme.name
   }
   setdDate(date) {
      this.theme.date = date
   }
   getDate() {
      return this.theme.date
   }
   setType(type) {
      this.theme.type = type
   }
   getType() {
      return this.theme.type
   }
   setDescription(description) {
      this.theme.description = description
   }
   getDescription() {
      return this.theme.desc
   }
   setHeure(heure) {
      this.theme.heure = heure
   }
   getHeure() {
      return this.theme.heure
   }
   setTel(tel) {
      this.theme.tel = tel
   }
   getTel() {
      return this.theme.tel
   }
   sendEventAddVehicule() {
      this.subject.next();
   }
   sendEventAddCustomer() {
      this.subject.next();
   }
   getAddVehicule(): Observable<any> {
      return this.subject.asObservable();
   }
   getAddCustomer(): Observable<any> {
      return this.subject.asObservable();
   }

   getMaintenanceOrders(): Promise<any> //--------------------MaintenanceOrders de statestiques--------
   {
      const inputRecord = new MIRecord();
      return new Promise((resolve, reject) => {
         this.userService.getUserContext().subscribe((context) => {
            const request: IMIRequest =
            {
               program: 'CMS100MI',
               transaction: 'LstOrByYear',
               record: inputRecord,
               outputFields: ["QHSTDT", "QHFIDT", "QHWHST", "QHMWNO", "QHPRNO", "MMIITNO", "MMITDS"]
            };
            this.miService.execute(request).subscribe((response: IMIResponse) => {
               if (!response.hasError()) {
                  this.Orders = response.items;
                  resolve(this.Orders)
               }
               else {
                  this.Orders = null;
               }
               return;
            }, (error) => {
               reject(error)
            });
         }, (error) => {
            reject(error)
         });
      });
   }

   getDataStatus(): Promise<any>//--------------------Status Work order de statestiques--------
   {
      const inputRecord = new MIRecord();
      return new Promise((resolve, reject) => {
         this.userService.getUserContext().subscribe((context) => {
            const request: IMIRequest =
            {
               program: 'CMS100MI',
               transaction: 'LstOrByYear',
               record: inputRecord,
               outputFields: ["QHSTDT", "QHFIDT", "QHWHST", "QHMWNO", "QHPRNO", "MMIITNO", "MMITDS"]
            };
            this.miService.execute(request).subscribe((response: IMIResponse) => {
               if (!response.hasError()) {
                  this.Orders = response.items;
                  for (let i = 0; i < this.Orders.length; i++) {
                     if (this.M3DateToYear(this.Orders[i]["QHSTDT"]) == this.CurrentYear.toString() && this.M3DateToMonth(this.Orders[i]["QHSTDT"]) <= this.GetCurrentMonth()) {
                        this.DataStatus.push({
                           "date": this.Orders[i]["QHSTDT"],
                           "status": this.Orders[i]["QHWHST"]
                        })
                     }


                  }
                  this.DataStatus.sort((a, b) => a.date.valueOf() - b.date.valueOf())
                  resolve(this.DataStatus)

               } else {
                  this.DataStatus = null;
               }
               return;
            }, (error) => {
               reject(error)
            });
         }, (error) => {
            reject(error)
         });
      });
   }
   public GetCurrentMonth() {
      this.Month = new Date().getMonth() + 1;
      if (this.Month < 10) {
         return '0' + this.Month
      }
      return this.Month
   }

   SetOccurenceDate(): Promise<any> {
      return new Promise((resolve, reject) => {
         this.Orders.forEach((x1) => {
            if (this.Tab2.some((val1) => {
               return this.M3DateToYear(val1["QHSTDT"]) == this.M3DateToYear(x1["QHSTDT"]) && this.M3DateToMonth(val1["QHSTDT"]) == this.M3DateToMonth(x1["QHSTDT"])
            })) {
               this.Tab2.forEach((k1) => {

                  if (this.M3DateToYear(k1["QHSTDT"]) === this.M3DateToYear(x1["QHSTDT"]) && this.M3DateToMonth(k1["QHSTDT"]) == this.M3DateToMonth(k1["QHSTDT"])) {

                     k1["occurrence"]++
                  }
               })
            }
            else {

               let a1 = {}
               a1["QHSTDT"] = x1["QHSTDT"]
               a1["occurrence"] = 1
               this.Tab2.push(a1);
            }
         })
         if (this.Tab2 != null) {
            resolve(this.Tab2)
         } else {
            reject(null)
         }
      })
   }
   //---------------------------------------Occurence By Model--------------------------------------
   SetOccurence(): Promise<any> {
      return new Promise((resolve, reject) => {
         this.Orders.forEach((x) => {
            if (this.Tab.some((val) => {
               return val["QHPRNO"] == x["QHPRNO"]
            })) {
               this.Tab.forEach((k) => {
                  if (k["QHPRNO"] === x["QHPRNO"]) {
                     k["occurrence"]++
                  }
               })
            }
            else {
               let a = {}
               a["QHPRNO"] = x["QHPRNO"]
               a["occurrence"] = 1
               this.Tab.push(a);
            }
         })
         if (this.Tab != null) {
            resolve(this.Tab)
         } else {
            reject(null)
         }
      })
   }
   SetOccurenceMonthByStatus(month: any, m: any): Promise<any> {
      this.Tab = [];
      console.log(this.Tab.length);
      return new Promise((resolve, reject) => {
         month.forEach((xx) => {
            if (this.Tab3.some((valx) => {
               return valx["status"].valueOf() == xx["status"].valueOf()
            })) {
               this.Tab3.forEach((p) => {
                  if (p["status"] === xx["status"]) {
                     p["occurrence"]++
                     p["month"] = m
                  }
               })
            }
            else {
               let a = {}
               a["status"] = xx["status"]
               a["occurrence"] = 1
               a["month"] = m
               this.Tab3.push(a);
            }
         })
         if (this.Tab3 != null) {
            resolve(this.Tab3)
         } else {
            reject(null)
         }
      })
   }
   OccBystatut2() {
      return new Promise((resolve, reject) => {
         this.Orders.forEach((x2) => {
            if (this.TabStat.some((val2) => {
               return val2["QHWHST"] == x2["QHWHST"]
            })) {
               this.TabStat.forEach((k2) => {
                  if (k2["QHWHST"] === x2["QHWHST"]) {
                     k2["occurrence"]++
                  }
               })
            }
            else {
               let a2 = {}
               a2["QHWHST"] = x2["QHWHST"]
               a2["occurrence"] = 1
               this.TabStat.push(a2);
            }
         })
         if (this.TabStat != null) {
            resolve(this.TabStat)
         } else {
            reject(null)
         }
      })
   }
   public M3DateToYear(M3Date: string) { //----------convert date to Year
      return M3Date.slice(0, 4)
   }
   public M3DateToMonth(M3Date: string) {//-----------convert date to Month
      return M3Date.slice(4, 6)
   }
   sendEventAddrdv() {  //-----------envoie function ajout rdv
      this.subject.next();
   }
   getAddrdv(): Observable<any> {
      return this.subject.asObservable();
   }
   sendEventUpdateRdv() {
      this.subject.next();
   }
   getUpdateRdv(): Observable<any> {
      return this.subject.asObservable();
   }
   sendEventConsultRdv() {
      this.subject.next();
   }
   getUpdateConsultRdv(): Observable<any> {
      return this.subject.asObservable();
   }

}

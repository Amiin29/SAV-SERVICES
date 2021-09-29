import { Injectable } from '@angular/core';
import { CoreBase, IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
@Injectable({
   providedIn: 'root'
})
export class CustomerService {

   constructor(private miService: MIService, private userService: UserService) { }

   public GetIDCustomer(ITNO, SERN): Promise<any> {
      return new Promise((resolve, reject) => {
         this.userService.getUserContext().subscribe((context) => {
            const request: IMIRequest =
            {
               program: 'MMS240MI',
               transaction: 'GetBasic',
               outputFields: ['CUNO'],

            };
            const inputrecord: MIRecord = new MIRecord();
            inputrecord.setString('ITNO', ITNO)
            inputrecord.setString('SERN', SERN)

            request.record = inputrecord;
            this.miService.execute(request).subscribe((response: IMIResponse) => {
               if (!response.hasError()) {
                  resolve(response['item']['CUNO']);

               } else {
                  reject(response.error)
               }

            }, (error) => {

            });
         }, (error) => {

         });



      })
   }
   public GetCustomerByCuno(CUNO): Promise<any> {
      return new Promise((resolve, reject) => {
         this.userService.getUserContext().subscribe((context) => {
            const request: IMIRequest =
            {
               program: 'CRS610MI',
               transaction: 'GetBasicData',
               outputFields: ['CUNM', 'CUNO', 'TOWN', 'PONO', 'CSCD', 'CUA1', 'PHNO', 'MAIL', 'CUA2', 'TFNO']

            };
            const inputrecord: MIRecord = new MIRecord();

            inputrecord.setString('CUNO', CUNO)
            inputrecord.setString('CONO', '860')
            request.record = inputrecord;
            this.miService.execute(request).subscribe((response: IMIResponse) => {
               if (!response.hasError()) {
                  console.log(response.item)
                  resolve(response.item)
               } else {
                  reject(Error);

               }

            }, (error) => {

            });
         }, (error) => {

         });
      })
   }
}

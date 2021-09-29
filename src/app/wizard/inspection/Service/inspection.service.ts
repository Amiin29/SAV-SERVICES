import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
   providedIn: 'root'
})
export class InspectionService {

   constructor(private http: HttpClient) { }
   // intervalId = setInterval(this.GetinspectionByMat ,1000);
   ngOnDestroy() {
      //  clearInterval(this.intervalId);
   }
   GetinspectionByMat(val): Promise<any> {
      return new Promise((resolve, reject) => {

         this.http.get('http://172.16.0.43:8081/inspection/' + val).toPromise().then(
            res => {
               resolve(res);
            }, msg => { // Error
               reject(msg);
            }
         );

      })
   }
   GetInspection(args, BasicData, Inspection): Promise<any> {
      return new Promise((resolve, reject) => {
         Inspection = [...Inspection]
         BasicData.forEach(element => {
            if (element['value']['id'] == args['1']['selectedRows']['0']['data']['title']) {
               Inspection[0] = {
                  'id': element['value']['id'],
                  'matricule': element['value']['matricule'],
                  'observation': element['value']['observation'],
                  'qualite': element['value']['qualite'],
                  'reception': element['value']['reception'],
                  'medias': element['value']['medias'],
               }
            }

         })
         resolve(Inspection);
      });
   }
}

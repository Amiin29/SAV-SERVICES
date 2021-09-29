  
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceDetailInspectionService {
allimgs = [];
  constructor() { }

  GetImgs (imgs ): Promise<any>{
    return new Promise((resolve, reject) => {
      this.allimgs = [];     
      for (let i=0 ; i< imgs.length ; i++){
        this.allimgs.push({
          'src' : 'http://172.16.0.43:8081/load/'+imgs[i]['link']
        })
      }

     
      resolve( this.allimgs);
    });}
}
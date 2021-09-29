import { Component, OnInit, ViewChild,Input, EventEmitter ,Output} from '@angular/core';
import {IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService } from '@infor-up/m3-odin-angular';
import { SohoDataGridComponent, SohoMessageService } from 'ids-enterprise-ng';

@Component({
  selector: 'app-garantit-vehicule',
  templateUrl: './garantit-vehicule.component.html',
  styleUrls: ['./garantit-vehicule.component.css']
})
export class GarantitVehiculeComponent implements OnInit {
  private pageSize = 7;
  isDetailBusy = false;
  isBusy = false;
  garantit :any[]= [];
  @Input() LIITNO: any;
  @Input() LISERN: any;
  STAT:any;
  CONO:any;
  WADT:any;
  WATP:any;
  PYNO:any;
  IDTY:any;
  @ViewChild('vehiculeDatagridGarantit') datagridGarantit: SohoDataGridComponent;
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent?: SohoDataGridComponent;
  datagridOptionsGarantit :SohoDataGridOptions;
  constructor(private miService: MIService, private messageService: SohoMessageService) { }
ngOnInit(): void {
    this.initGarantitGrid();
    this.GetGarantitVehicule();
}
  ngOnChanges(changes) {
    this.initGarantitGrid(); 
    this.GetGarantitVehicule();
   }
  initGarantitGrid(){
    const optionsGarantit: SohoDataGridOptions = {
       selectable: 'single' as SohoDataGridSelectable,
       disableRowDeactivation: true,
       clickToSelect: false,
       alternateRowShading: true,
       cellNavigation: false,
       idProperty: 'col-cuno',
       paging: true,
       rowHeight:'small' ,
       pagesize: this.pageSize,
       indeterminate: false,
       editable: true,
       showDirty: true,
       stretchColumn: 'favorite',
      columns: [
          {
             width: 'auto', id: 'col-ITNO', field: 'ITNO', name: 'Numéro d article',
             resizable: true, filterType: 'text', sortable: true
          },
        
          {
             width: 'auto', id: 'col-SERN', field: 'SERN', name: 'Numero de Chassis',
             resizable: true, filterType: 'text', sortable: true
          },
          {
             width: 'auto', id: 'col-MSEQ', field: 'STAT', name: 'Statut',
             resizable: true, filterType: 'text', sortable: true
          },
          {
             width: 'auto', id: 'col-MSEQ', field: 'CONO', name: 'Divison',
             resizable: true, filterType: 'text', sortable: true
          },
          {
           width: 'auto', id: 'col-WADT', field: 'WADT', name: 'Date Garantit',
           resizable: true, filterType: 'text', sortable: true
        },
          {
             width: 'auto', id: 'col-STRT', field: 'WATP', name: 'Type Garantit',
             resizable: true, filterType: 'text', sortable: true
          },
          {
           width: 'auto', id: 'col-SUFI', field: 'PYNO', name: 'Payeur',
           resizable: true, filterType: 'text', sortable: true
         },
      
        {
           width: 'auto', id: 'col-STDT', field: 'IDTY', name: 'Type d article',
           resizable: true, filterType: 'text', sortable: true
        },
         
       ],
       dataset: [],
       emptyMessage: {
          title: 'No Garantit available',
          icon: 'icon-empty-no-data'
       }
    };
    this.datagridOptionsGarantit = optionsGarantit;
 }
//------------------------------Garantie Vehicule------------------------------------------------------------//
GetGarantitVehicule(){
  this.initGarantitGrid();
  this.setBusy(true);
       const requestInfoByGarantit: IMIRequest = 
        {
           program: 'MOS390MI',
           transaction: 'LstClaDetail',
           outputFields: [ 'ITNO' , 'IDTY','CONO','SERN','STAT','WADT','WATP','PYNO','IDTY'],
          
        };
        const inputrecord :MIRecord= new MIRecord();
        inputrecord.setString('ITNO',this.LIITNO); 
        inputrecord.setString('SERN',this.LISERN);
        requestInfoByGarantit.record = inputrecord;
        this.miService.execute(requestInfoByGarantit).subscribe((response: IMIResponse) => 
        {
           if (!response.hasError()) 
           {
              this.garantit = response.items;
              this.updateGridGarantit();
           } 
           else
           {
           
           }
           this.setBusy(false);
        }, (error) => 
        {
           this.setBusy(false);
          
        });
}
private setBusy(isBusy: boolean, isDetail?: boolean) 
   {
      isDetail ? this.isDetailBusy = isBusy : this.isBusy = isBusy;
   }
updateGridGarantit() {
    this.datagridGarantit ? this.datagridGarantit.dataset = this.garantit : this.datagridOptionsGarantit.dataset = this.garantit;
   }

}

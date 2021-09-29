import { Component, OnInit, ViewChild, Input, EventEmitter, Output, ViewContainerRef } from '@angular/core';
import { CoreBase, IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService, UserService } from '@infor-up/m3-odin-angular';
import { SohoDataGridComponent, SohoMessageService, SohoModalDialogService, SohoToastService } from 'ids-enterprise-ng';
import { VehiculeServiceService } from 'src/app/wizard/vehicule/VehiculeService/vehicule-service.service';
import { AddVehiculeComponent } from './add-vehicule/add-vehicule.component';
import { WizardDemoComponent } from 'src/app/wizard/wizard.demo';
import { ColorService } from 'src/app/color.service';
import { CustomerService } from 'src/app/wizard/customer/Service/customer.service'
import { AddCustomerComponent } from '../customer/add-customer/add-customer.component';

@Component({
   selector: 'vehicule',
   templateUrl: './vehicule.component.html',
   styleUrls: ['./vehicule.component.css']

})
export class VehiculeComponent extends CoreBase implements OnInit {
   imageSrc = 'assets/car-removebg.png'

   @Output() newVehculeEvent: EventEmitter<string> = new EventEmitter<string>();
   @Input() CUNO: string; // decorate the property with @Input()
   @ViewChild(SohoDataGridComponent) sohoDataGridComponent?: SohoDataGridComponent;
   @ViewChild('vehiculeDatagrid') datagrid: SohoDataGridComponent;
   @ViewChild('dialogPlaceholder', { read: ViewContainerRef, static: true })
   placeholder?: ViewContainerRef;
   CUNOOb: any
   Nom: any
   Num: any
   Tel: any
   Ville: any
   Adresse: any
   itemmat: any;
   itemGarantitITNO: any;
   itemGarantitSERN: any;
   itemCompteurITNO: any;
   itemCompteurSERN: any;
   LIRFIA
   RFIA: any
   datagridOptions: SohoDataGridOptions;
   private maxRecords = 50000;
   private pageSize = 5;
   isBusy = false;
   isDetailBusy = false;
   Vehiculs: any[] = [];
   Vehiculs2: any[] = [];

   NewLstVehiculs: any[] = [];
   ServiceClosed: any[] = [];
   hasSelected = false
   test = false;
   ButtAddClient = false
   i = 0
   NumClient: any
   constructor(private CustomerService: CustomerService, private mycolor: ColorService, private toastService: SohoToastService, private VehiculeServiceService: VehiculeServiceService, private WDC: WizardDemoComponent, private modalService: SohoModalDialogService, private miService: MIService, private miService2: MIService, private userService: UserService, private messageService: SohoMessageService, private WizardDemoComponent: WizardDemoComponent) {
      super('VehiculeComponent');
      this.initGrid();
   }
   ngOnChanges(changes) {
      this.listVehicule();
      this.updateGridData();
      this.onSelected(changes)
   }
   ngOnInit(): void {
      this.listVehicule();
      this.updateGridData();
   }
   initGrid() {
      const options: SohoDataGridOptions = {
         selectable: 'single' as SohoDataGridSelectable,
         disableRowDeactivation: true,
         clickToSelect: false,
         alternateRowShading: true,
         cellNavigation: false,
         idProperty: 'col-cuno',
         paging: true,
         rowHeight: 'small',
         pagesize: this.pageSize,
         indeterminate: false,
         editable: true,
         filterable: true,
         showDirty: true,
         stretchColumn: 'favorite',
         columns: [
            {
               width: 40, id: 'selectionCheckbox', field: '', name: '', sortable: false,
               resizable: false, align: 'center', formatter: Soho.Formatters.SelectionCheckbox
            },

            {
               width: 'auto', id: 'col-itno', field: 'LIITNO', name: 'Code Voiture',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-sern', field: 'LISERN', name: 'Numéro Chassis',
               resizable: true, filterType: 'text', sortable: true
            },
            {
               width: 'auto', id: 'col-aagn', field: 'LIRFIA', name: 'Matricule',
               resizable: true, filterType: 'text', sortable: true
            },
         ],
         dataset: [],
         emptyMessage: {
            title: 'Aucun véhicule disponible',
            icon: 'icon-empty-no-data'
         }
      };
      this.datagridOptions = options;
   }
   listVehicule() {
      if (this.isBusy) {
         return;
      }
      this.setBusy(true);
      this.userService.getUserContext().subscribe((context) => {
         const request: IMIRequest =
         {
            program: 'CMS100MI',
            transaction: 'LstVehbyCus',
            outputFields: ['LICUNO', 'LIITNO', 'LISERN', 'LIRFIA', 'MMITNO'],
            maxReturnedRecords: this.maxRecords
         };
         const inputrecord: MIRecord = new MIRecord();
         request.record = inputrecord;
         this.miService.execute(request).subscribe((response: IMIResponse) => {
            if (!response.hasError()) {
               this.Vehiculs = response.items;
               console.log(this.Vehiculs)
               this.updateGridData();
               /** console.log(response.items[0]['LIRFIA'])
               let j = 0
               for (let i = 0; i <= response.items.length; i++) {
                  if (response.items[i]['LIRFIA'] != '') {
                     this.Vehiculs2[j] = response.items[i]
                     j++
                  } else {
                     console.log('------------')

                  }

               } */

            }
            this.setBusy(false);
         }, (error) => {
            this.setBusy(false);
         });
      }, (error) => {
         this.setBusy(false);
      });
   }
   updateGridData() {
      this.datagrid ? this.datagrid.dataset = this.Vehiculs : this.datagridOptions.dataset = this.Vehiculs;
   }
   private setBusy(isBusy: boolean, isDetail?: boolean) {
      isDetail ? this.isDetailBusy = isBusy : this.isBusy = isBusy;
   }
   onSelected(args: any[], isSingleSelect?: boolean) {
      if (this.isBusy) {
         return;
      }
      const newCount = args.length;
      const selected = args && newCount === 1 ? args[0].data : null;
      this.hasSelected = !!selected;
      if (this.hasSelected) {
         console.log(selected)
         this.itemGarantitITNO = selected['LIITNO']
         this.itemGarantitSERN = selected['LISERN']
         this.itemCompteurITNO = selected['LIITNO']
         this.itemCompteurSERN = selected['LISERN']
         this.SendCurrentVeheculeIsSelected(selected['LIRFIA']);
         this.VehiculeServiceService.SetSERN(selected['LISERN'])
         this.VehiculeServiceService.SetCodeVehicule(selected['LIITNO'])
         this.VehiculeServiceService.SetCustomerNumber(selected['OKCUNO'])
         this.NumClient = selected['LICUNO']
         this.VehiculeServiceService.SetCustomerNumber(this.NumClient)
         this.RFIA = selected['LIRFIA']
         console.log(selected['LICUNO'])

         this.CustomerService.GetIDCustomer(this.itemCompteurITNO, this.itemCompteurSERN).then(cuno => {
            this.CustomerService.GetCustomerByCuno(cuno).then(customer => {
               console.log(customer)
               this.Nom = customer['CUNM']
               this.Tel = customer['PHNO']
               this.Ville = customer['TOWN']
               this.Adresse = customer['CUA1']
               console.log('---------Customer------------')
               console.log(customer)

            })
            if (this.NumClient == '') {
               this.ButtAddClient = true
            } else { this.ButtAddClient = false }
         })
      }
      else {
         this.WizardDemoComponent.ifvehiculeSelected(false)
      }
   }
   onDeselected(args: any) {
      this.WizardDemoComponent.ifvehiculeSelected(false)
   }
   ModalAddVhehicule() {
      const dialogRef = this.modalService
         .modal<AddVehiculeComponent>(AddVehiculeComponent, this.placeholder, { fullsize: 'responsive' })
         .title('')
         .buttons(
            [
               {
                  text: 'Cancel', click: () => {
                     dialogRef.close('CANCEL');
                  }, isDefault: false
               },
               {
               },
               {
                  text: 'Ajouter', click: () => {
                     this.isBusy = true;
                     this.mycolor.sendEventAddVehicule()
                     this.ToastAddVehicule()
                     setTimeout(() => {
                        this.isBusy = false;
                        this.ngOnInit();
                     }
                        , 2000);
                     dialogRef.close('SUBMIT');
                  }, isDefault: false,
                  id: 'sendbutton'
               }
            ])
         .open();
   }
   Modal_ajouter_client() {
      const dialogRef = this.modalService
         .modal<AddCustomerComponent>(AddCustomerComponent, this.placeholder, { fullsize: 'responsive' })
         .title('')
         .buttons(
            [
               {
                  text: 'Cancel', click: () => {
                     dialogRef.close('CANCEL');
                  }, isDefault: false
               },
               {
               },
               {
                  text: 'Ajouter', click: () => {
                     this.mycolor.sendEventAddCustomer()

                     let cn = this.mycolor.getobbjet2()
                     this.Nom = this.mycolor.getNameCustomer()
                     this.Ville = this.mycolor.getAreaCustomer()
                     this.Tel = this.mycolor.getMobileCustomer()
                     this.Adresse = this.mycolor.getAdresse()
                     console.log(this.NumClient + this.Nom + this.Ville + this.Tel + this.Adresse)
                     setTimeout(() => {
                        this.NumClient = this.mycolor.getCUNO()
                        this.VehiculeServiceService.SetCustomerNumber(this.NumClient)
                     }
                        , 1000);
                     this.ToastAddCutsomer()
                     dialogRef.close('SUBMIT');
                  }, isDefault: false,
                  id: 'sendbutton'
               }
            ])
         .open();
   }
   UpdateDataCustomer() {
      console.log(this.Nom)
   }
   SendCurrentVeheculeIsSelected(value: string) {
      this.newVehculeEvent.emit(value);
   }
   ToastAddVehicule(position: SohoToastPosition = SohoToastService.TOP_RIGHT) {
      this.toastService.show({ draggable: true, title: '', message: 'Véhicule Ajouté avec succès', position });

   }
   ToastAddCutsomer(position: SohoToastPosition = SohoToastService.TOP_RIGHT) {
      this.toastService.show({ draggable: true, title: '', message: 'Client Ajouté avec succès', position });
   }
}

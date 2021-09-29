import {
   Component,
   HostBinding,
   ViewEncapsulation,
   ViewChild,
   AfterViewInit, OnInit
} from '@angular/core';

// @ts-ignore
import { SohoPersonalizeDirective, SohoRenderLoopService, SohoApplicationMenuComponent } from 'ids-enterprise-ng';
import { IUserContext } from "@infor-up/m3-odin";
import { MIService, UserService } from "@infor-up/m3-odin-angular";

interface IKeyValue {
   key: string;
   value: string;
}

@Component({
   selector: 'body', // eslint-disable-line
   templateUrl: 'app.component.html',
   styleUrls: ['./app.component.css'],
   encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit, OnInit {
   private static IS_APPLICATION_MENU_OPEN_KEY = 'is-application-menu-open';
   @ViewChild(SohoApplicationMenuComponent, { static: true })
   public applicationMenu?: SohoApplicationMenuComponent;

   @ViewChild(SohoPersonalizeDirective, { static: true }) personalize?: SohoPersonalizeDirective;

   @HostBinding('class.no-scroll') get isNoScroll() {
      return true;
   }
   public useUpliftIcons = false;
   userContext = {} as IUserContext;
   public personalizeOptions: SohoPersonalizeOptions = {};

   constructor(private readonly renderLoop: SohoRenderLoopService, private miService: MIService, private userService: UserService) {
      this.renderLoop.start();
   }

   async ngOnInit() {
      await this.userService.getUserContext().subscribe((userContext: IUserContext) => {
         this.userContext = userContext;
         console.log(userContext.NAME)
      });
   }

   ngAfterViewInit(): void {
      if (this.isApplicationMenuOpen) {
         this.applicationMenu?.openMenu(true, true);
      } else {
         this.applicationMenu?.closeMenu();
      }
   }

   public get isApplicationMenuOpen(): boolean {
      const valueString = localStorage.getItem(AppComponent.IS_APPLICATION_MENU_OPEN_KEY);
      return valueString ? (valueString === 'true') : true;
   }

   public set isApplicationMenuOpen(open: boolean) {
      localStorage.setItem(AppComponent.IS_APPLICATION_MENU_OPEN_KEY, open ? 'true' : 'false');
   }
   onChangeTheme(ev: SohoPersonalizeEvent) {
      this.useUpliftIcons = ev.data.theme === 'theme-uplift-light'
         || ev.data.theme === 'theme-uplift-dark'
         || ev.data.theme === 'theme-uplift-contrast';
   }
   public onMenuVisibility(visible: boolean): void {
      if (this.isApplicationMenuOpen !== visible) {
         this.isApplicationMenuOpen = visible;
      }
   }
}

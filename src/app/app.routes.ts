import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WizardDemoComponent } from './wizard/wizard.demo';
export const routes: Routes =
   [
      { path: '', component: WizardDemoComponent },
      { path: 'Services', component: WizardDemoComponent },


   ];
export const AppRoutingModule: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes, { useHash: false, relativeLinkResolution: 'legacy' });

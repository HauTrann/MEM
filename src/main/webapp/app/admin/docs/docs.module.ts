import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MedicalEquipmentManagerSharedModule } from 'app/shared/shared.module';

import { DocsComponent } from './docs.component';

import { docsRoute } from './docs.route';

@NgModule({
  imports: [MedicalEquipmentManagerSharedModule, RouterModule.forChild([docsRoute])],
  declarations: [DocsComponent]
})
export class DocsModule {}

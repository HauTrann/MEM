import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserManagementComponent } from './user-management.component';
import { UserManagementDetailComponent } from './user-management-detail.component';
import { UserManagementUpdateComponent } from './user-management-update.component';
import { UserManagementDeleteDialogComponent } from './user-management-delete-dialog.component';
import { userManagementRoute } from './user-management.route';
import { NgSelectModule } from '@ng-select/ng-select';
import { MedicalEquipmentManagerSharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [MedicalEquipmentManagerSharedModule, RouterModule.forChild(userManagementRoute), NgSelectModule],
  declarations: [
    UserManagementComponent,
    UserManagementDetailComponent,
    UserManagementUpdateComponent,
    UserManagementDeleteDialogComponent
  ],
  entryComponents: [UserManagementDeleteDialogComponent]
})
export class UserManagementModule {}

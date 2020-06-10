import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmployeeComponent } from './employee.component';
import { EmployeeDetailComponent } from './employee-detail.component';
import { EmployeeUpdateComponent } from './employee-update.component';
import { EmployeeDeleteDialogComponent } from './employee-delete-dialog.component';
import { employeeRoute } from './employee.route';
import { NgSelectModule } from '@ng-select/ng-select';
import { MedicalEquipmentManagerSharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [MedicalEquipmentManagerSharedModule, RouterModule.forChild(employeeRoute), NgSelectModule],
  declarations: [EmployeeComponent, EmployeeDetailComponent, EmployeeUpdateComponent, EmployeeDeleteDialogComponent],
  entryComponents: [EmployeeDeleteDialogComponent]
})
export class EmployeeModule {}

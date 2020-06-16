import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'department',
        loadChildren: () => import('./department/department.module').then(m => m.MedicalEquipmentManagerDepartmentModule)
      },
      {
        path: 'equipment',
        loadChildren: () => import('./equipment/equipment.module').then(m => m.MedicalEquipmentManagerEquipmentModule)
      },
      {
        path: 'equipment-type',
        loadChildren: () => import('./equipment-type/equipment-type.module').then(m => m.MedicalEquipmentManagerEquipmentTypeModule)
      },
      {
        path: 'in-out-repository',
        loadChildren: () => import('./in-out-repository/in-out-repository.module').then(m => m.MedicalEquipmentManagerInOutRepositoryModule)
      },
      {
        path: 'in-out-repository-details',
        loadChildren: () =>
          import('./in-out-repository-details/in-out-repository-details.module').then(
            m => m.MedicalEquipmentManagerInOutRepositoryDetailsModule
          )
      },
      {
        path: 'medical-supplies',
        loadChildren: () => import('./medical-supplies/medical-supplies.module').then(m => m.MedicalEquipmentManagerMedicalSuppliesModule)
      },
      {
        path: 'medical-supplies-type',
        loadChildren: () =>
          import('./medical-supplies-type/medical-supplies-type.module').then(m => m.MedicalEquipmentManagerMedicalSuppliesTypeModule)
      },
      {
        path: 'organization-unit',
        loadChildren: () =>
          import('./organization-unit/organization-unit.module').then(m => m.MedicalEquipmentManagerOrganizationUnitModule)
      },
      {
        path: 'repository',
        loadChildren: () => import('./repository/repository.module').then(m => m.MedicalEquipmentManagerRepositoryModule)
      },
      {
        path: 'repository-ledger',
        loadChildren: () =>
          import('./repository-ledger/repository-ledger.module').then(m => m.MedicalEquipmentManagerRepositoryLedgerModule)
      },
      {
        path: 'employee',
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
      },
      {
        path: 'report',
        loadChildren: () => import('./report/report.module').then(m => m.MedicalEquipmentManagerReportModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class MedicalEquipmentManagerEntityModule {}

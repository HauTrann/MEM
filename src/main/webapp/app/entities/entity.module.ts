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
      },
      {
        path: 'request-receive-device',
        loadChildren: () =>
          import('./request-receive-device/request-receive-device.module').then(m => m.MedicalEquipmentManagerRequestReceiveDeviceModule)
      },
      {
        path: 'request-receive-device-details',
        loadChildren: () =>
          import('./request-receive-device-details/request-receive-device-details.module').then(
            m => m.MedicalEquipmentManagerRequestReceiveDeviceDetailsModule
          )
      },
      {
        path: 'technical-data-time-line',
        loadChildren: () =>
          import('./technical-data-time-line/technical-data-time-line.module').then(
            m => m.MedicalEquipmentManagerTechnicalDataTimeLineModule
          )
      },
      {
        path: 'report-broken-equipment',
        loadChildren: () =>
          import('./report-broken-equipment/report-broken-equipment.module').then(m => m.MedicalEquipmentManagerReportBrokenEquipmentModule)
      },
      {
        path: 'proposed-repair-and-maintain',
        loadChildren: () =>
          import('./proposed-repair-and-maintain/proposed-repair-and-maintain.module').then(
            m => m.MedicalEquipmentManagerProposedRepairAndMaintainModule
          )
      },
      {
        path: 'proposed-repair-and-maintain-details',
        loadChildren: () =>
          import('./proposed-repair-and-maintain-details/proposed-repair-and-maintain-details.module').then(
            m => m.MedicalEquipmentManagerProposedRepairAndMaintainDetailsModule
          )
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class MedicalEquipmentManagerEntityModule {}

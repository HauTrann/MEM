import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDepartment, Department } from 'app/shared/model/department.model';
import { DepartmentService } from './department.service';
import { UtilsService } from 'app/entities/utils/utils.service';
import { IOrganizationUnit } from 'app/shared/model/organization-unit.model';
import { OrganizationUnitService } from 'app/entities/organization-unit/organization-unit.service';

@Component({
  selector: 'jhi-department-update',
  templateUrl: './department-update.component.html'
})
export class DepartmentUpdateComponent implements OnInit {
  isSaving = false;
  statuss: any[] = [];
  organizationUnits: IOrganizationUnit[] | null = [];
  organizationUnitID?: number;

  editForm = this.fb.group({
    id: [],
    name: [],
    code: [],
    description: [],
    status: [],
    organizationUnitID: []
  });

  constructor(
    protected departmentService: DepartmentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public utilsService: UtilsService,
    private organizationUnitService: OrganizationUnitService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ department }) => {
      this.updateForm(department);
    });
    this.statuss = this.utilsService.statuss;
    this.organizationUnitService.getAll().subscribe(res => {
      this.organizationUnits = res.body;
    });
  }

  updateForm(department: IDepartment): void {
    this.editForm.patchValue({
      id: department.id,
      name: department.name,
      code: department.code,
      description: department.description,
      status: department.status === undefined ? 1 : department.status,
      organizationUnitID: department.organizationUnitID
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const department = this.createFromForm();
    if (department.id !== undefined) {
      this.subscribeToSaveResponse(this.departmentService.update(department));
    } else {
      this.subscribeToSaveResponse(this.departmentService.create(department));
    }
  }

  private createFromForm(): IDepartment {
    return {
      ...new Department(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      code: this.editForm.get(['code'])!.value,
      description: this.editForm.get(['description'])!.value,
      status: this.editForm.get(['status'])!.value,
      organizationUnitID: this.editForm.get(['organizationUnitID'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepartment>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}

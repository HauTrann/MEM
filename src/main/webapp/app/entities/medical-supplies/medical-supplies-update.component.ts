import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMedicalSupplies, MedicalSupplies } from 'app/shared/model/medical-supplies.model';
import { MedicalSuppliesService } from './medical-supplies.service';
import { UtilsService } from 'app/entities/utils/utils.service';
import { MedicalSuppliesType } from 'app/shared/model/medical-supplies-type.model';
import { MedicalSuppliesTypeService } from 'app/entities/medical-supplies-type/medical-supplies-type.service';

@Component({
  selector: 'jhi-medical-supplies-update',
  templateUrl: './medical-supplies-update.component.html'
})
export class MedicalSuppliesUpdateComponent implements OnInit {
  isSaving = false;

  medicalSuppliesTypes: MedicalSuppliesType[] | null = [];

  editForm = this.fb.group({
    id: [],
    code: [],
    name: [],
    medicalSuppliesTypeID: [],
    description: [],
    status: []
  });

  constructor(
    protected medicalSuppliesService: MedicalSuppliesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public utilsService: UtilsService,
    protected medicalSuppliesTypeService: MedicalSuppliesTypeService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ medicalSupplies }) => {
      this.updateForm(medicalSupplies);
    });
    this.medicalSuppliesTypeService.query().subscribe(res => {
      this.medicalSuppliesTypes = res.body;
    });
  }

  updateForm(medicalSupplies: IMedicalSupplies): void {
    this.editForm.patchValue({
      id: medicalSupplies.id,
      code: medicalSupplies.code,
      name: medicalSupplies.name,
      medicalSuppliesTypeID: medicalSupplies.medicalSuppliesTypeID,
      description: medicalSupplies.description,
      status: medicalSupplies.status === undefined ? 1 : medicalSupplies.status
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const medicalSupplies = this.createFromForm();
    if (medicalSupplies.id !== undefined) {
      this.subscribeToSaveResponse(this.medicalSuppliesService.update(medicalSupplies));
    } else {
      this.subscribeToSaveResponse(this.medicalSuppliesService.create(medicalSupplies));
    }
  }

  private createFromForm(): IMedicalSupplies {
    return {
      ...new MedicalSupplies(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      name: this.editForm.get(['name'])!.value,
      medicalSuppliesTypeID: this.editForm.get(['medicalSuppliesTypeID'])!.value,
      description: this.editForm.get(['description'])!.value,
      status: this.editForm.get(['status'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedicalSupplies>>): void {
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

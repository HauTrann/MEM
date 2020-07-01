import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IReportBrokenEquipment, ReportBrokenEquipment } from 'app/shared/model/report-broken-equipment.model';
import { ReportBrokenEquipmentService } from './report-broken-equipment.service';

@Component({
  selector: 'jhi-report-broken-equipment-update',
  templateUrl: './report-broken-equipment-update.component.html'
})
export class ReportBrokenEquipmentUpdateComponent implements OnInit {
  isSaving = false;
  timeDp: any;

  editForm = this.fb.group({
    id: [],
    prodID: [],
    serial: [],
    description: [],
    status: [],
    userID: [],
    time: [],
    organizationUnitID: [],
    prodName: []
  });

  constructor(
    protected reportBrokenEquipmentService: ReportBrokenEquipmentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reportBrokenEquipment }) => {
      this.updateForm(reportBrokenEquipment);
    });
  }

  updateForm(reportBrokenEquipment: IReportBrokenEquipment): void {
    this.editForm.patchValue({
      id: reportBrokenEquipment.id,
      prodID: reportBrokenEquipment.prodID,
      serial: reportBrokenEquipment.serial,
      description: reportBrokenEquipment.description,
      status: reportBrokenEquipment.status,
      userID: reportBrokenEquipment.userID,
      time: reportBrokenEquipment.time,
      organizationUnitID: reportBrokenEquipment.organizationUnitID,
      prodName: reportBrokenEquipment.prodName
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reportBrokenEquipment = this.createFromForm();
    if (reportBrokenEquipment.id !== undefined) {
      this.subscribeToSaveResponse(this.reportBrokenEquipmentService.update(reportBrokenEquipment));
    } else {
      this.subscribeToSaveResponse(this.reportBrokenEquipmentService.create(reportBrokenEquipment));
    }
  }

  private createFromForm(): IReportBrokenEquipment {
    return {
      ...new ReportBrokenEquipment(),
      id: this.editForm.get(['id'])!.value,
      prodID: this.editForm.get(['prodID'])!.value,
      serial: this.editForm.get(['serial'])!.value,
      description: this.editForm.get(['description'])!.value,
      status: this.editForm.get(['status'])!.value,
      userID: this.editForm.get(['userID'])!.value,
      time: this.editForm.get(['time'])!.value,
      organizationUnitID: this.editForm.get(['organizationUnitID'])!.value,
      prodName: this.editForm.get(['prodName'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReportBrokenEquipment>>): void {
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

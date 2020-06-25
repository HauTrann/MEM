import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITechnicalDataTimeLine, TechnicalDataTimeLine } from 'app/shared/model/technical-data-time-line.model';
import { TechnicalDataTimeLineService } from './technical-data-time-line.service';

@Component({
  selector: 'jhi-technical-data-time-line-update',
  templateUrl: './technical-data-time-line-update.component.html'
})
export class TechnicalDataTimeLineUpdateComponent implements OnInit {
  isSaving = false;
  timeDp: any;

  editForm = this.fb.group({
    id: [],
    name: [],
    value: [],
    equipmentID: [],
    time: [],
    serial: [],
    userID: []
  });

  constructor(
    protected technicalDataTimeLineService: TechnicalDataTimeLineService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ technicalDataTimeLine }) => {
      this.updateForm(technicalDataTimeLine);
    });
  }

  updateForm(technicalDataTimeLine: ITechnicalDataTimeLine): void {
    this.editForm.patchValue({
      id: technicalDataTimeLine.id,
      name: technicalDataTimeLine.name,
      value: technicalDataTimeLine.value,
      equipmentID: technicalDataTimeLine.equipmentID,
      time: technicalDataTimeLine.time,
      serial: technicalDataTimeLine.serial,
      userID: technicalDataTimeLine.userID
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const technicalDataTimeLine = this.createFromForm();
    if (technicalDataTimeLine.id !== undefined) {
      this.subscribeToSaveResponse(this.technicalDataTimeLineService.update(technicalDataTimeLine));
    } else {
      this.subscribeToSaveResponse(this.technicalDataTimeLineService.create(technicalDataTimeLine));
    }
  }

  private createFromForm(): ITechnicalDataTimeLine {
    return {
      ...new TechnicalDataTimeLine(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      value: this.editForm.get(['value'])!.value,
      equipmentID: this.editForm.get(['equipmentID'])!.value,
      time: this.editForm.get(['time'])!.value,
      serial: this.editForm.get(['serial'])!.value,
      userID: this.editForm.get(['userID'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITechnicalDataTimeLine>>): void {
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

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IInOutRepositoryDetails, InOutRepositoryDetails } from 'app/shared/model/in-out-repository-details.model';
import { InOutRepositoryDetailsService } from './in-out-repository-details.service';

@Component({
  selector: 'jhi-in-out-repository-details-update',
  templateUrl: './in-out-repository-details-update.component.html'
})
export class InOutRepositoryDetailsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    prodID: [],
    prodName: [],
    quantity: [],
    unit: [],
    unitPrice: [],
    amount: []
  });

  constructor(
    protected inOutRepositoryDetailsService: InOutRepositoryDetailsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inOutRepositoryDetails }) => {
      this.updateForm(inOutRepositoryDetails);
    });
  }

  updateForm(inOutRepositoryDetails: IInOutRepositoryDetails): void {
    this.editForm.patchValue({
      id: inOutRepositoryDetails.id,
      prodID: inOutRepositoryDetails.prodID,
      prodName: inOutRepositoryDetails.prodName,
      quantity: inOutRepositoryDetails.quantity,
      unit: inOutRepositoryDetails.unit,
      unitPrice: inOutRepositoryDetails.unitPrice,
      amount: inOutRepositoryDetails.amount
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const inOutRepositoryDetails = this.createFromForm();
    if (inOutRepositoryDetails.id !== undefined) {
      this.subscribeToSaveResponse(this.inOutRepositoryDetailsService.update(inOutRepositoryDetails));
    } else {
      this.subscribeToSaveResponse(this.inOutRepositoryDetailsService.create(inOutRepositoryDetails));
    }
  }

  private createFromForm(): IInOutRepositoryDetails {
    return {
      ...new InOutRepositoryDetails(),
      id: this.editForm.get(['id'])!.value,
      prodID: this.editForm.get(['prodID'])!.value,
      prodName: this.editForm.get(['prodName'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      unit: this.editForm.get(['unit'])!.value,
      unitPrice: this.editForm.get(['unitPrice'])!.value,
      amount: this.editForm.get(['amount'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInOutRepositoryDetails>>): void {
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

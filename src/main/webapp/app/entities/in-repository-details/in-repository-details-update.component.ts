import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IInRepositoryDetails, InRepositoryDetails } from 'app/shared/model/in-repository-details.model';
import { InRepositoryDetailsService } from './in-repository-details.service';

@Component({
  selector: 'jhi-in-repository-details-update',
  templateUrl: './in-repository-details-update.component.html'
})
export class InRepositoryDetailsUpdateComponent implements OnInit {
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
    protected inRepositoryDetailsService: InRepositoryDetailsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inRepositoryDetails }) => {
      this.updateForm(inRepositoryDetails);
    });
  }

  updateForm(inRepositoryDetails: IInRepositoryDetails): void {
    this.editForm.patchValue({
      id: inRepositoryDetails.id,
      prodID: inRepositoryDetails.prodID,
      prodName: inRepositoryDetails.prodName,
      quantity: inRepositoryDetails.quantity,
      unit: inRepositoryDetails.unit,
      unitPrice: inRepositoryDetails.unitPrice,
      amount: inRepositoryDetails.amount
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const inRepositoryDetails = this.createFromForm();
    if (inRepositoryDetails.id !== undefined) {
      this.subscribeToSaveResponse(this.inRepositoryDetailsService.update(inRepositoryDetails));
    } else {
      this.subscribeToSaveResponse(this.inRepositoryDetailsService.create(inRepositoryDetails));
    }
  }

  private createFromForm(): IInRepositoryDetails {
    return {
      ...new InRepositoryDetails(),
      id: this.editForm.get(['id'])!.value,
      prodID: this.editForm.get(['prodID'])!.value,
      prodName: this.editForm.get(['prodName'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      unit: this.editForm.get(['unit'])!.value,
      unitPrice: this.editForm.get(['unitPrice'])!.value,
      amount: this.editForm.get(['amount'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInRepositoryDetails>>): void {
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

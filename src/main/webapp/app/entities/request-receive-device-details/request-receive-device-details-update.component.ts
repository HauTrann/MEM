import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRequestReceiveDeviceDetails, RequestReceiveDeviceDetails } from 'app/shared/model/request-receive-device-details.model';
import { RequestReceiveDeviceDetailsService } from './request-receive-device-details.service';

@Component({
  selector: 'jhi-request-receive-device-details-update',
  templateUrl: './request-receive-device-details-update.component.html'
})
export class RequestReceiveDeviceDetailsUpdateComponent implements OnInit {
  isSaving = false;
  expiryDateDp: any;

  editForm = this.fb.group({
    id: [],
    requestReceiveDeviceID: [],
    serial: [],
    prodID: [],
    prodName: [],
    quantity: [],
    unit: [],
    unitPrice: [],
    amount: [],
    repositoryID: [],
    lotNo: [],
    expiryDate: []
  });

  constructor(
    protected requestReceiveDeviceDetailsService: RequestReceiveDeviceDetailsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ requestReceiveDeviceDetails }) => {
      this.updateForm(requestReceiveDeviceDetails);
    });
  }

  updateForm(requestReceiveDeviceDetails: IRequestReceiveDeviceDetails): void {
    this.editForm.patchValue({
      id: requestReceiveDeviceDetails.id,
      requestReceiveDeviceID: requestReceiveDeviceDetails.requestReceiveDeviceID,
      serial: requestReceiveDeviceDetails.serial,
      prodID: requestReceiveDeviceDetails.prodID,
      prodName: requestReceiveDeviceDetails.prodName,
      quantity: requestReceiveDeviceDetails.quantity,
      unit: requestReceiveDeviceDetails.unit,
      unitPrice: requestReceiveDeviceDetails.unitPrice,
      amount: requestReceiveDeviceDetails.amount,
      repositoryID: requestReceiveDeviceDetails.repositoryID,
      lotNo: requestReceiveDeviceDetails.lotNo,
      expiryDate: requestReceiveDeviceDetails.expiryDate
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const requestReceiveDeviceDetails = this.createFromForm();
    if (requestReceiveDeviceDetails.id !== undefined) {
      this.subscribeToSaveResponse(this.requestReceiveDeviceDetailsService.update(requestReceiveDeviceDetails));
    } else {
      this.subscribeToSaveResponse(this.requestReceiveDeviceDetailsService.create(requestReceiveDeviceDetails));
    }
  }

  private createFromForm(): IRequestReceiveDeviceDetails {
    return {
      ...new RequestReceiveDeviceDetails(),
      id: this.editForm.get(['id'])!.value,
      requestReceiveDeviceID: this.editForm.get(['requestReceiveDeviceID'])!.value,
      serial: this.editForm.get(['serial'])!.value,
      prodID: this.editForm.get(['prodID'])!.value,
      prodName: this.editForm.get(['prodName'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      unit: this.editForm.get(['unit'])!.value,
      unitPrice: this.editForm.get(['unitPrice'])!.value,
      amount: this.editForm.get(['amount'])!.value,
      repositoryID: this.editForm.get(['repositoryID'])!.value,
      lotNo: this.editForm.get(['lotNo'])!.value,
      expiryDate: this.editForm.get(['expiryDate'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRequestReceiveDeviceDetails>>): void {
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

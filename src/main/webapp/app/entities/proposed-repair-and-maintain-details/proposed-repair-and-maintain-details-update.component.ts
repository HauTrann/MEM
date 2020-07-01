import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import {
  IProposedRepairAndMaintainDetails,
  ProposedRepairAndMaintainDetails
} from 'app/shared/model/proposed-repair-and-maintain-details.model';
import { ProposedRepairAndMaintainDetailsService } from './proposed-repair-and-maintain-details.service';

@Component({
  selector: 'jhi-proposed-repair-and-maintain-details-update',
  templateUrl: './proposed-repair-and-maintain-details-update.component.html'
})
export class ProposedRepairAndMaintainDetailsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    proposedRepairAndMaintainID: [],
    serial: [],
    prodID: [],
    prodName: [],
    quantity: [],
    unit: [],
    repositoryID: []
  });

  constructor(
    protected proposedRepairAndMaintainDetailsService: ProposedRepairAndMaintainDetailsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ proposedRepairAndMaintainDetails }) => {
      this.updateForm(proposedRepairAndMaintainDetails);
    });
  }

  updateForm(proposedRepairAndMaintainDetails: IProposedRepairAndMaintainDetails): void {
    this.editForm.patchValue({
      id: proposedRepairAndMaintainDetails.id,
      proposedRepairAndMaintainID: proposedRepairAndMaintainDetails.proposedRepairAndMaintainID,
      serial: proposedRepairAndMaintainDetails.serial,
      prodID: proposedRepairAndMaintainDetails.prodID,
      prodName: proposedRepairAndMaintainDetails.prodName,
      quantity: proposedRepairAndMaintainDetails.quantity,
      unit: proposedRepairAndMaintainDetails.unit,
      repositoryID: proposedRepairAndMaintainDetails.repositoryID
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const proposedRepairAndMaintainDetails = this.createFromForm();
    if (proposedRepairAndMaintainDetails.id !== undefined) {
      this.subscribeToSaveResponse(this.proposedRepairAndMaintainDetailsService.update(proposedRepairAndMaintainDetails));
    } else {
      this.subscribeToSaveResponse(this.proposedRepairAndMaintainDetailsService.create(proposedRepairAndMaintainDetails));
    }
  }

  private createFromForm(): IProposedRepairAndMaintainDetails {
    return {
      ...new ProposedRepairAndMaintainDetails(),
      id: this.editForm.get(['id'])!.value,
      proposedRepairAndMaintainID: this.editForm.get(['proposedRepairAndMaintainID'])!.value,
      serial: this.editForm.get(['serial'])!.value,
      prodID: this.editForm.get(['prodID'])!.value,
      prodName: this.editForm.get(['prodName'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      unit: this.editForm.get(['unit'])!.value,
      repositoryID: this.editForm.get(['repositoryID'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProposedRepairAndMaintainDetails>>): void {
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

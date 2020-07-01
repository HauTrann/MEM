import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProposedRepairAndMaintain, ProposedRepairAndMaintain } from 'app/shared/model/proposed-repair-and-maintain.model';
import { ProposedRepairAndMaintainService } from './proposed-repair-and-maintain.service';

@Component({
  selector: 'jhi-proposed-repair-and-maintain-update',
  templateUrl: './proposed-repair-and-maintain-update.component.html'
})
export class ProposedRepairAndMaintainUpdateComponent implements OnInit {
  isSaving = false;
  proposedDateDp: any;
  validationDateDp: any;
  finishDateDp: any;

  editForm = this.fb.group({
    id: [],
    organizationUnitID: [],
    userID: [],
    description: [],
    proposedDate: [],
    validationDate: [],
    finishDate: [],
    status: []
  });

  constructor(
    protected proposedRepairAndMaintainService: ProposedRepairAndMaintainService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ proposedRepairAndMaintain }) => {
      this.updateForm(proposedRepairAndMaintain);
    });
  }

  updateForm(proposedRepairAndMaintain: IProposedRepairAndMaintain): void {
    this.editForm.patchValue({
      id: proposedRepairAndMaintain.id,
      organizationUnitID: proposedRepairAndMaintain.organizationUnitID,
      userID: proposedRepairAndMaintain.userID,
      description: proposedRepairAndMaintain.description,
      proposedDate: proposedRepairAndMaintain.proposedDate,
      validationDate: proposedRepairAndMaintain.validationDate,
      finishDate: proposedRepairAndMaintain.finishDate,
      status: proposedRepairAndMaintain.status
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const proposedRepairAndMaintain = this.createFromForm();
    if (proposedRepairAndMaintain.id !== undefined) {
      this.subscribeToSaveResponse(this.proposedRepairAndMaintainService.update(proposedRepairAndMaintain));
    } else {
      this.subscribeToSaveResponse(this.proposedRepairAndMaintainService.create(proposedRepairAndMaintain));
    }
  }

  private createFromForm(): IProposedRepairAndMaintain {
    return {
      ...new ProposedRepairAndMaintain(),
      id: this.editForm.get(['id'])!.value,
      organizationUnitID: this.editForm.get(['organizationUnitID'])!.value,
      userID: this.editForm.get(['userID'])!.value,
      description: this.editForm.get(['description'])!.value,
      proposedDate: this.editForm.get(['proposedDate'])!.value,
      validationDate: this.editForm.get(['validationDate'])!.value,
      finishDate: this.editForm.get(['finishDate'])!.value,
      status: this.editForm.get(['status'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProposedRepairAndMaintain>>): void {
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

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRepositoryLedger, RepositoryLedger } from 'app/shared/model/repository-ledger.model';
import { RepositoryLedgerService } from './repository-ledger.service';

@Component({
  selector: 'jhi-repository-ledger-update',
  templateUrl: './repository-ledger-update.component.html'
})
export class RepositoryLedgerUpdateComponent implements OnInit {
  isSaving = false;
  dateDp: any;
  postedDateDp: any;

  editForm = this.fb.group({
    id: [],
    refID: [],
    detailID: [],
    date: [],
    postedDate: [],
    no: [],
    deliver: [],
    phoneContact: [],
    quantity: [],
    unit: [],
    unitPrice: [],
    amount: []
  });

  constructor(
    protected repositoryLedgerService: RepositoryLedgerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ repositoryLedger }) => {
      this.updateForm(repositoryLedger);
    });
  }

  updateForm(repositoryLedger: IRepositoryLedger): void {
    this.editForm.patchValue({
      id: repositoryLedger.id,
      refID: repositoryLedger.refID,
      detailID: repositoryLedger.detailID,
      date: repositoryLedger.date,
      postedDate: repositoryLedger.postedDate,
      no: repositoryLedger.no,
      deliver: repositoryLedger.deliver,
      phoneContact: repositoryLedger.phoneContact,
      quantity: repositoryLedger.quantity,
      unit: repositoryLedger.unit,
      unitPrice: repositoryLedger.unitPrice,
      amount: repositoryLedger.amount
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const repositoryLedger = this.createFromForm();
    if (repositoryLedger.id !== undefined) {
      this.subscribeToSaveResponse(this.repositoryLedgerService.update(repositoryLedger));
    } else {
      this.subscribeToSaveResponse(this.repositoryLedgerService.create(repositoryLedger));
    }
  }

  private createFromForm(): IRepositoryLedger {
    return {
      ...new RepositoryLedger(),
      id: this.editForm.get(['id'])!.value,
      refID: this.editForm.get(['refID'])!.value,
      detailID: this.editForm.get(['detailID'])!.value,
      date: this.editForm.get(['date'])!.value,
      postedDate: this.editForm.get(['postedDate'])!.value,
      no: this.editForm.get(['no'])!.value,
      deliver: this.editForm.get(['deliver'])!.value,
      phoneContact: this.editForm.get(['phoneContact'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      unit: this.editForm.get(['unit'])!.value,
      unitPrice: this.editForm.get(['unitPrice'])!.value,
      amount: this.editForm.get(['amount'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRepositoryLedger>>): void {
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

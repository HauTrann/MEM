import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IInOutRepository, InOutRepository } from 'app/shared/model/in-out-repository.model';
import { InOutRepositoryService } from './in-out-repository.service';

@Component({
  selector: 'jhi-in-out-repository-update',
  templateUrl: './in-out-repository-update.component.html'
})
export class InOutRepositoryUpdateComponent implements OnInit {
  isSaving = false;
  dateDp: any;
  postedDateDp: any;

  editForm = this.fb.group({
    id: [],
    organizationUnitID: [],
    date: [],
    postedDate: [],
    no: [],
    deliver: [],
    phoneContact: [],
    outOfStock: [],
    recorded: []
  });

  constructor(
    protected inOutRepositoryService: InOutRepositoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inOutRepository }) => {
      this.updateForm(inOutRepository);
    });
  }

  updateForm(inOutRepository: IInOutRepository): void {
    this.editForm.patchValue({
      id: inOutRepository.id,
      organizationUnitID: inOutRepository.organizationUnitID,
      date: inOutRepository.date,
      postedDate: inOutRepository.postedDate,
      no: inOutRepository.no,
      deliver: inOutRepository.deliver,
      phoneContact: inOutRepository.phoneContact,
      outOfStock: inOutRepository.outOfStock,
      recorded: inOutRepository.recorded
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const inOutRepository = this.createFromForm();
    if (inOutRepository.id !== undefined) {
      this.subscribeToSaveResponse(this.inOutRepositoryService.update(inOutRepository));
    } else {
      this.subscribeToSaveResponse(this.inOutRepositoryService.create(inOutRepository));
    }
  }

  private createFromForm(): IInOutRepository {
    return {
      ...new InOutRepository(),
      id: this.editForm.get(['id'])!.value,
      organizationUnitID: this.editForm.get(['organizationUnitID'])!.value,
      date: this.editForm.get(['date'])!.value,
      postedDate: this.editForm.get(['postedDate'])!.value,
      no: this.editForm.get(['no'])!.value,
      deliver: this.editForm.get(['deliver'])!.value,
      phoneContact: this.editForm.get(['phoneContact'])!.value,
      outOfStock: this.editForm.get(['outOfStock'])!.value,
      recorded: this.editForm.get(['recorded'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInOutRepository>>): void {
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

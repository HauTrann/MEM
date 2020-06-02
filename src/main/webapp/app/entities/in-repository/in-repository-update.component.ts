import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IInRepository, InRepository } from 'app/shared/model/in-repository.model';
import { InRepositoryService } from './in-repository.service';

@Component({
  selector: 'jhi-in-repository-update',
  templateUrl: './in-repository-update.component.html'
})
export class InRepositoryUpdateComponent implements OnInit {
  isSaving = false;
  dateDp: any;
  postedDateDp: any;

  editForm = this.fb.group({
    id: [],
    date: [],
    postedDate: [],
    no: [],
    deliver: [],
    phoneContact: []
  });

  constructor(protected inRepositoryService: InRepositoryService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inRepository }) => {
      this.updateForm(inRepository);
    });
  }

  updateForm(inRepository: IInRepository): void {
    this.editForm.patchValue({
      id: inRepository.id,
      date: inRepository.date,
      postedDate: inRepository.postedDate,
      no: inRepository.no,
      deliver: inRepository.deliver,
      phoneContact: inRepository.phoneContact
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const inRepository = this.createFromForm();
    if (inRepository.id !== undefined) {
      this.subscribeToSaveResponse(this.inRepositoryService.update(inRepository));
    } else {
      this.subscribeToSaveResponse(this.inRepositoryService.create(inRepository));
    }
  }

  private createFromForm(): IInRepository {
    return {
      ...new InRepository(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value,
      postedDate: this.editForm.get(['postedDate'])!.value,
      no: this.editForm.get(['no'])!.value,
      deliver: this.editForm.get(['deliver'])!.value,
      phoneContact: this.editForm.get(['phoneContact'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInRepository>>): void {
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

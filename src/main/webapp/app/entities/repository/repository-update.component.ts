import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRepository, Repository } from 'app/shared/model/repository.model';
import { RepositoryService } from './repository.service';
import { UtilsService } from 'app/entities/utils/utils.service';

@Component({
  selector: 'jhi-repository-update',
  templateUrl: './repository-update.component.html'
})
export class RepositoryUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    code: [],
    name: [],
    description: [],
    status: []
  });

  constructor(
    protected repositoryService: RepositoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ repository }) => {
      this.updateForm(repository);
    });
  }

  updateForm(repository: IRepository): void {
    this.editForm.patchValue({
      id: repository.id,
      code: repository.code,
      name: repository.name,
      description: repository.description,
      status: repository.status === undefined ? 1 : repository.status
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const repository = this.createFromForm();
    if (repository.id !== undefined) {
      this.subscribeToSaveResponse(this.repositoryService.update(repository));
    } else {
      this.subscribeToSaveResponse(this.repositoryService.create(repository));
    }
  }

  private createFromForm(): IRepository {
    return {
      ...new Repository(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      status: this.editForm.get(['status'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRepository>>): void {
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

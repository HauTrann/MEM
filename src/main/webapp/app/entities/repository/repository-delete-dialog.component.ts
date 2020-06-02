import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRepository } from 'app/shared/model/repository.model';
import { RepositoryService } from './repository.service';

@Component({
  templateUrl: './repository-delete-dialog.component.html'
})
export class RepositoryDeleteDialogComponent {
  repository?: IRepository;

  constructor(
    protected repositoryService: RepositoryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.repositoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('repositoryListModification');
      this.activeModal.close();
    });
  }
}

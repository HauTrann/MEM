import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInRepository } from 'app/shared/model/in-repository.model';
import { InRepositoryService } from './in-repository.service';

@Component({
  templateUrl: './in-repository-delete-dialog.component.html'
})
export class InRepositoryDeleteDialogComponent {
  inRepository?: IInRepository;

  constructor(
    protected inRepositoryService: InRepositoryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.inRepositoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('inRepositoryListModification');
      this.activeModal.close();
    });
  }
}

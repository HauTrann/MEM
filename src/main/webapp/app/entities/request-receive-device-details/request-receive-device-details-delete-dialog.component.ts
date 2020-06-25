import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRequestReceiveDeviceDetails } from 'app/shared/model/request-receive-device-details.model';
import { RequestReceiveDeviceDetailsService } from './request-receive-device-details.service';

@Component({
  templateUrl: './request-receive-device-details-delete-dialog.component.html'
})
export class RequestReceiveDeviceDetailsDeleteDialogComponent {
  requestReceiveDeviceDetails?: IRequestReceiveDeviceDetails;

  constructor(
    protected requestReceiveDeviceDetailsService: RequestReceiveDeviceDetailsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.requestReceiveDeviceDetailsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('requestReceiveDeviceDetailsListModification');
      this.activeModal.close();
    });
  }
}

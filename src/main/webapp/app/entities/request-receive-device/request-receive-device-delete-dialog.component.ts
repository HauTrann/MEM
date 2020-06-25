import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRequestReceiveDevice } from 'app/shared/model/request-receive-device.model';
import { RequestReceiveDeviceService } from './request-receive-device.service';

@Component({
  templateUrl: './request-receive-device-delete-dialog.component.html'
})
export class RequestReceiveDeviceDeleteDialogComponent {
  requestReceiveDevice?: IRequestReceiveDevice;

  constructor(
    protected requestReceiveDeviceService: RequestReceiveDeviceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.requestReceiveDeviceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('requestReceiveDeviceListModification');
      this.activeModal.close();
    });
  }
}

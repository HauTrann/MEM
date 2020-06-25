import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRequestReceiveDeviceDetails } from 'app/shared/model/request-receive-device-details.model';

@Component({
  selector: 'jhi-request-receive-device-details-detail',
  templateUrl: './request-receive-device-details-detail.component.html'
})
export class RequestReceiveDeviceDetailsDetailComponent implements OnInit {
  requestReceiveDeviceDetails: IRequestReceiveDeviceDetails | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      ({ requestReceiveDeviceDetails }) => (this.requestReceiveDeviceDetails = requestReceiveDeviceDetails)
    );
  }

  previousState(): void {
    window.history.back();
  }
}

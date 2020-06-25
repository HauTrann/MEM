import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRequestReceiveDevice } from 'app/shared/model/request-receive-device.model';
import { UtilsService } from 'app/entities/utils/utils.service';
import { DeviceModel } from 'app/entities/in-out-repository/device.model';
import { EquipmentService } from 'app/entities/equipment/equipment.service';

@Component({
  selector: 'jhi-request-receive-device-detail',
  templateUrl: './request-receive-device-detail.component.html',
  styleUrls: ['./request-receive-device.scss']
})
export class RequestReceiveDeviceDetailComponent implements OnInit {
  requestReceiveDevice: IRequestReceiveDevice | null = null;
  isFromManager?: boolean;
  isPay?: boolean;
  deviceModels?: DeviceModel[] | null;

  constructor(protected activatedRoute: ActivatedRoute, public utilsService: UtilsService, public equipmentService: EquipmentService) {
    this.isFromManager = window.location.href.includes('/manager');
    this.isPay = window.location.href.includes('request-receive-device/pay');
    this.equipmentService.findAllDevice().subscribe(res => {
      this.deviceModels = res.body;
    });
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ requestReceiveDevice }) => (this.requestReceiveDevice = requestReceiveDevice));
  }

  previousState(): void {
    window.history.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRequestReceiveDevice, RequestReceiveDevice } from 'app/shared/model/request-receive-device.model';
import { RequestReceiveDeviceService } from './request-receive-device.service';
import { RequestReceiveDeviceDetails } from 'app/shared/model/request-receive-device-details.model';
import { DeviceModel } from 'app/entities/in-out-repository/device.model';
import { EquipmentService } from 'app/entities/equipment/equipment.service';
import { InOutRepositoryDetails } from 'app/shared/model/in-out-repository-details.model';
import { UtilsService } from 'app/entities/utils/utils.service';
import * as moment from 'moment';

@Component({
  selector: 'jhi-request-receive-device-update',
  templateUrl: './request-receive-device-update.component.html',
  styleUrls: ['request-receive-device.scss']
})
export class RequestReceiveDeviceUpdateComponent implements OnInit {
  isSaving = false;
  requestDateDp: any;
  dateOfDeliveryDp: any;
  requestReceiveDevice: IRequestReceiveDevice = {};
  deviceModels?: DeviceModel[] | null;
  requestReceiveDeviceDetails: RequestReceiveDeviceDetails[] = [];
  isFromManager?: boolean;
  isPay?: boolean;

  constructor(
    protected requestReceiveDeviceService: RequestReceiveDeviceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    protected equipmentService: EquipmentService,
    public utilsService: UtilsService
  ) {
    this.equipmentService.findAllDevice().subscribe(res => {
      this.deviceModels = res.body;
    });
    this.isFromManager = window.location.href.includes('/manager');
    this.isPay = window.location.href.includes('request-receive-device/pay');
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ requestReceiveDevice }) => {
      if (requestReceiveDevice && requestReceiveDevice.id) {
        this.requestReceiveDevice = requestReceiveDevice;
        this.requestReceiveDeviceDetails = this.requestReceiveDevice.requestReceiveDeviceDetails
          ? this.requestReceiveDevice.requestReceiveDeviceDetails
          : [];
      } else {
        this.requestReceiveDevice = {};
        this.requestReceiveDevice.status = 0;
        this.requestReceiveDevice.requestDate = moment(moment.now());
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    this.requestReceiveDevice.requestReceiveDeviceDetails = this.requestReceiveDeviceDetails;
    if (this.isPay) {
      this.requestReceiveDevice.isPay = true;
    } else {
      this.requestReceiveDevice.isPay = false;
    }
    if (this.requestReceiveDevice.id !== undefined) {
      this.subscribeToSaveResponse(this.requestReceiveDeviceService.update(this.requestReceiveDevice));
    } else {
      this.subscribeToSaveResponse(this.requestReceiveDeviceService.create(this.requestReceiveDevice));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRequestReceiveDevice>>): void {
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

  addNewRow(): void {
    this.requestReceiveDeviceDetails?.push({});
  }

  removeRow(detail: any): void {
    this.requestReceiveDeviceDetails?.splice(this.requestReceiveDeviceDetails.indexOf(detail), 1);
  }

  searchcountry(term: string, item: any): boolean {
    term = term.toLocaleLowerCase();
    return item.code.toLocaleLowerCase().indexOf(term) > -1 || item.name.toLocaleLowerCase().includes(term);
  }

  deviceChange(detail: InOutRepositoryDetails): void {
    detail.prodName = this.deviceModels?.find(n => n.id === detail.prodID)?.name;
  }

  sumDT(prop: string): number {
    let total = 0;
    for (let i = 0; i < this.requestReceiveDeviceDetails?.length; i++) {
      total += this.requestReceiveDeviceDetails[i][prop];
    }
    return isNaN(total) ? 0 : total;
  }

  quantityChange(detail: InOutRepositoryDetails): void {
    detail.amount = (detail.quantity ? detail.quantity : 0) * (detail.unitPrice ? detail.unitPrice : 0);
  }

  unitPriceChange(detail: InOutRepositoryDetails): void {
    detail.amount = (detail.quantity ? detail.quantity : 0) * (detail.unitPrice ? detail.unitPrice : 0);
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IInOutRepository } from 'app/shared/model/in-out-repository.model';
import { InOutRepositoryService } from './in-out-repository.service';
import { InOutRepositoryDetails } from 'app/shared/model/in-out-repository-details.model';
import { IRepository } from 'app/shared/model/repository.model';
import { RepositoryService } from 'app/entities/repository/repository.service';
import { DeviceModel } from 'app/entities/in-out-repository/device.model';
import { EquipmentService } from 'app/entities/equipment/equipment.service';
import * as moment from 'moment';

@Component({
  selector: 'jhi-in-out-repository-update',
  templateUrl: './in-out-repository-update.component.html',
  styleUrls: ['in-out-repository.scss']
})
export class InOutRepositoryUpdateComponent implements OnInit {
  isSaving = false;
  dateDp: any;
  postedDateDp: any;
  isNhapKho?: boolean;
  inOutRepositoryDetails: InOutRepositoryDetails[] = [];
  repositorys?: IRepository[] | null;
  deviceModels?: DeviceModel[] | null;
  inOutRepository: IInOutRepository = {};

  constructor(
    protected inOutRepositoryService: InOutRepositoryService,
    protected activatedRoute: ActivatedRoute,
    protected repositoryService: RepositoryService,
    protected equipmentService: EquipmentService,
    private fb: FormBuilder
  ) {
    this.isNhapKho = window.location.href.includes('in-out-repository/in');
    repositoryService.query().subscribe(res => {
      this.repositorys = res.body;
    });

    equipmentService.findAllDevice().subscribe(res => {
      this.deviceModels = res.body;
    });
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((inOutRepository: any) => {
      if (inOutRepository.inOutRepository.id) {
        this.inOutRepository = inOutRepository.inOutRepository;
        this.inOutRepositoryDetails = this.inOutRepository.inOutRepositoryDetails ? this.inOutRepository.inOutRepositoryDetails : [];
      } else {
        this.inOutRepository = inOutRepository.inOutRepository;
        this.inOutRepository.date = moment(moment.now());
        this.inOutRepository.postedDate = moment(moment.now());
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    this.inOutRepository.inOutRepositoryDetails = this.inOutRepositoryDetails;
    if (this.isNhapKho) {
      this.inOutRepository.outOfStock = false;
    } else {
      this.inOutRepository.outOfStock = true;
    }
    if (this.inOutRepository?.id !== undefined) {
      this.subscribeToSaveResponse(this.inOutRepositoryService.update(this.inOutRepository));
    } else {
      this.subscribeToSaveResponse(this.inOutRepositoryService.create(this.inOutRepository));
    }
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

  newArr(lenght: number): any[] {
    if (lenght > 0) {
      return new Array(lenght);
    } else {
      return new Array(0);
    }
  }

  addNewRow(): void {
    this.inOutRepositoryDetails?.push({});
  }

  removeRow(detail: any): void {
    this.inOutRepositoryDetails?.splice(this.inOutRepositoryDetails.indexOf(detail), 1);
  }

  quantityChange(detail: InOutRepositoryDetails): void {
    detail.amount = (detail.quantity ? detail.quantity : 0) * (detail.unitPrice ? detail.unitPrice : 0);
  }

  unitPriceChange(detail: InOutRepositoryDetails): void {
    detail.amount = (detail.quantity ? detail.quantity : 0) * (detail.unitPrice ? detail.unitPrice : 0);
  }

  deviceChange(detail: InOutRepositoryDetails): void {
    detail.prodName = this.deviceModels?.find(n => n.id === detail.prodID)?.name;
  }

  sumDT(prop: string): number {
    let total = 0;
    for (let i = 0; i < this.inOutRepositoryDetails?.length; i++) {
      total += this.inOutRepositoryDetails[i][prop];
    }
    return isNaN(total) ? 0 : total;
  }

  searchcountry(term: string, item: any): boolean {
    term = term.toLocaleLowerCase();
    return item.code.toLocaleLowerCase().indexOf(term) > -1 || item.name.toLocaleLowerCase().includes(term);
  }
}

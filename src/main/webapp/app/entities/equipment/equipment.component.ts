import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { IEquipment } from 'app/shared/model/equipment.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { EquipmentService } from './equipment.service';
import { EquipmentDeleteDialogComponent } from './equipment-delete-dialog.component';
import { UtilsService } from 'app/entities/utils/utils.service';
import { ITechnicalDataTimeLine } from 'app/shared/model/technical-data-time-line.model';
import { TechnicalDataTimeLineService } from 'app/entities/technical-data-time-line/technical-data-time-line.service';
import { ReportBrokenEquipmentService } from 'app/entities/report-broken-equipment/report-broken-equipment.service';
import { IReportBrokenEquipment } from 'app/shared/model/report-broken-equipment.model';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

@Component({
  selector: 'jhi-equipment',
  templateUrl: './equipment.component.html'
})
export class EquipmentComponent implements OnInit, OnDestroy {
  @ViewChild('content') public modalComponent?: NgbModalRef;
  @ViewChild('contentBaoHong') public modalComponentBaoHong?: NgbModalRef;
  equipment?: IEquipment[];
  equipmentDT?: IEquipment[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  isDisplayUsing?: boolean;
  rowSelected?: IEquipment;
  technicalDataTimeLines?: ITechnicalDataTimeLine[];
  modalRef?: NgbModalRef;
  modalRefBH?: NgbModalRef;
  description?: string;
  reportBrokenEquipment: IReportBrokenEquipment = {};

  constructor(
    protected equipmentService: EquipmentService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected reportBrokenEquipmentService: ReportBrokenEquipmentService,
    protected modalService: NgbModal,
    public utilsService: UtilsService,
    public technicalDataTimeLineService: TechnicalDataTimeLineService,
    private toastr: ToastrService
  ) {
    this.equipmentDT = [];
    this.isDisplayUsing = window.location.href.includes('equipment/using');
    this.technicalDataTimeLines = [];
  }

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    if (this.isDisplayUsing) {
      this.equipmentService
        .queryUsing({
          page: pageToLoad - 1,
          size: this.itemsPerPage,
          sort: this.sort()
        })
        .subscribe(
          (res: HttpResponse<IEquipment[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
          () => this.onError()
        );
    } else {
      this.equipmentService
        .query({
          page: pageToLoad - 1,
          size: this.itemsPerPage,
          sort: this.sort()
        })
        .subscribe(
          (res: HttpResponse<IEquipment[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
          () => this.onError()
        );
    }
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage();
    });
    this.registerChangeInEquipment();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEquipment): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEquipment(): void {
    this.eventSubscriber = this.eventManager.subscribe('equipmentListModification', () => this.loadPage());
  }

  delete(equipment: IEquipment): void {
    const modalRef = this.modalService.open(EquipmentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.equipment = equipment;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IEquipment[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (this.isDisplayUsing) {
      this.router.navigate(['/equipment/using'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
        }
      });
    } else {
      this.router.navigate(['/equipment'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
        }
      });
    }

    this.equipment = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }

  downClick(equipment: IEquipment): void {}

  selectRow(equipment: IEquipment): void {
    this.rowSelected = equipment;
    if (!this.isDisplayUsing) {
      this.equipmentService.queryDetail({ id: equipment.id }).subscribe(res => {
        this.equipmentDT = res.body ? res.body : undefined;
      });
    }
  }

  closeContent(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }

  closeContentBH(): void {
    if (this.modalRefBH) {
      this.modalRefBH.close();
    }
  }

  baoHong(): void {
    this.reportBrokenEquipment = {};
    this.reportBrokenEquipment.serial = this.rowSelected?.serial;
    this.reportBrokenEquipment.description = this.description;
    this.reportBrokenEquipment.prodID = this.rowSelected?.id;
    this.reportBrokenEquipment.prodName = this.rowSelected?.name;
    this.reportBrokenEquipment.time = moment(new Date());
    this.reportBrokenEquipment.status = 0;
    this.reportBrokenEquipmentService.create(this.reportBrokenEquipment).subscribe(res => {
      if (res.body) {
        if (this.modalRefBH) {
          this.modalRefBH.close();
        }
        this.toastr.success('Báo hỏng thành công');
      }
    });
  }

  openBaoHong(): void {
    if (this.modalRefBH) {
      this.modalRefBH.close();
    }
    this.reportBrokenEquipment = {};
    this.modalRefBH = this.modalService.open(this.modalComponentBaoHong, { backdrop: 'static' });
  }

  openTSKT(serial: string): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
    this.technicalDataTimeLineService.getNoww(serial).subscribe(res => {
      if (res.body) {
        this.technicalDataTimeLines = res.body;
        this.modalRef = this.modalService.open(this.modalComponent, { backdrop: 'static' });
      }
    });
  }

  update(): void {}
}

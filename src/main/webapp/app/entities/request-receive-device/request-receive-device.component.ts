import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRequestReceiveDevice } from 'app/shared/model/request-receive-device.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { RequestReceiveDeviceService } from './request-receive-device.service';
import { RequestReceiveDeviceDeleteDialogComponent } from './request-receive-device-delete-dialog.component';
import { UtilsService } from 'app/entities/utils/utils.service';

@Component({
  selector: 'jhi-request-receive-device',
  templateUrl: './request-receive-device.component.html'
})
export class RequestReceiveDeviceComponent implements OnInit, OnDestroy {
  requestReceiveDevices?: IRequestReceiveDevice[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  isFromManager?: boolean;
  isPay?: boolean;

  constructor(
    protected requestReceiveDeviceService: RequestReceiveDeviceService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    public utilsService: UtilsService
  ) {
    this.isFromManager = window.location.href.includes('/manager');
    this.isPay = window.location.href.includes('request-receive-device/pay');
  }

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    if (this.isFromManager) {
      if (this.isPay) {
        this.requestReceiveDeviceService
          .queryForManagerPay({
            page: pageToLoad - 1,
            size: this.itemsPerPage,
            sort: this.sort()
          })
          .subscribe(
            (res: HttpResponse<IRequestReceiveDevice[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
            () => this.onError()
          );
      } else {
        this.requestReceiveDeviceService
          .queryForManager({
            page: pageToLoad - 1,
            size: this.itemsPerPage,
            sort: this.sort()
          })
          .subscribe(
            (res: HttpResponse<IRequestReceiveDevice[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
            () => this.onError()
          );
      }
    } else {
      if (this.isPay) {
        this.requestReceiveDeviceService
          .queryForManagerForEmployeePay({
            page: pageToLoad - 1,
            size: this.itemsPerPage,
            sort: this.sort()
          })
          .subscribe(
            (res: HttpResponse<IRequestReceiveDevice[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
            () => this.onError()
          );
      } else {
        this.requestReceiveDeviceService
          .queryForManagerForEmployee({
            page: pageToLoad - 1,
            size: this.itemsPerPage,
            sort: this.sort()
          })
          .subscribe(
            (res: HttpResponse<IRequestReceiveDevice[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
            () => this.onError()
          );
      }
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
    this.registerChangeInRequestReceiveDevices();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRequestReceiveDevice): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRequestReceiveDevices(): void {
    this.eventSubscriber = this.eventManager.subscribe('requestReceiveDeviceListModification', () => this.loadPage());
  }

  delete(requestReceiveDevice: IRequestReceiveDevice): void {
    const modalRef = this.modalService.open(RequestReceiveDeviceDeleteDialogComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.requestReceiveDevice = requestReceiveDevice;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IRequestReceiveDevice[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (this.isFromManager) {
      if (this.isPay) {
        this.router.navigate(['/request-receive-device/pay/manager'], {
          queryParams: {
            page: this.page,
            size: this.itemsPerPage,
            sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
          }
        });
      } else {
        this.router.navigate(['/request-receive-device/manager'], {
          queryParams: {
            page: this.page,
            size: this.itemsPerPage,
            sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
          }
        });
      }
    } else {
      if (this.isPay) {
        this.router.navigate(['/request-receive-device/pay'], {
          queryParams: {
            page: this.page,
            size: this.itemsPerPage,
            sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
          }
        });
      } else {
        this.router.navigate(['/request-receive-device'], {
          queryParams: {
            page: this.page,
            size: this.itemsPerPage,
            sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
          }
        });
      }
    }
    this.requestReceiveDevices = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRequestReceiveDeviceDetails } from 'app/shared/model/request-receive-device-details.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { RequestReceiveDeviceDetailsService } from './request-receive-device-details.service';
import { RequestReceiveDeviceDetailsDeleteDialogComponent } from './request-receive-device-details-delete-dialog.component';

@Component({
  selector: 'jhi-request-receive-device-details',
  templateUrl: './request-receive-device-details.component.html'
})
export class RequestReceiveDeviceDetailsComponent implements OnInit, OnDestroy {
  requestReceiveDeviceDetails?: IRequestReceiveDeviceDetails[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected requestReceiveDeviceDetailsService: RequestReceiveDeviceDetailsService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.requestReceiveDeviceDetailsService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IRequestReceiveDeviceDetails[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage();
    });
    this.registerChangeInRequestReceiveDeviceDetails();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRequestReceiveDeviceDetails): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRequestReceiveDeviceDetails(): void {
    this.eventSubscriber = this.eventManager.subscribe('requestReceiveDeviceDetailsListModification', () => this.loadPage());
  }

  delete(requestReceiveDeviceDetails: IRequestReceiveDeviceDetails): void {
    const modalRef = this.modalService.open(RequestReceiveDeviceDetailsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.requestReceiveDeviceDetails = requestReceiveDeviceDetails;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IRequestReceiveDeviceDetails[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/request-receive-device-details'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.requestReceiveDeviceDetails = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}

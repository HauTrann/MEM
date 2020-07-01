import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IReportBrokenEquipment } from 'app/shared/model/report-broken-equipment.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ReportBrokenEquipmentService } from './report-broken-equipment.service';
import { ReportBrokenEquipmentDeleteDialogComponent } from './report-broken-equipment-delete-dialog.component';

@Component({
  selector: 'jhi-report-broken-equipment',
  templateUrl: './report-broken-equipment.component.html'
})
export class ReportBrokenEquipmentComponent implements OnInit, OnDestroy {
  reportBrokenEquipments?: IReportBrokenEquipment[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected reportBrokenEquipmentService: ReportBrokenEquipmentService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.reportBrokenEquipmentService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IReportBrokenEquipment[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
    this.registerChangeInReportBrokenEquipments();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IReportBrokenEquipment): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInReportBrokenEquipments(): void {
    this.eventSubscriber = this.eventManager.subscribe('reportBrokenEquipmentListModification', () => this.loadPage());
  }

  delete(reportBrokenEquipment: IReportBrokenEquipment): void {
    const modalRef = this.modalService.open(ReportBrokenEquipmentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.reportBrokenEquipment = reportBrokenEquipment;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IReportBrokenEquipment[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/report-broken-equipment'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.reportBrokenEquipments = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProposedRepairAndMaintain } from 'app/shared/model/proposed-repair-and-maintain.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ProposedRepairAndMaintainService } from './proposed-repair-and-maintain.service';
import { ProposedRepairAndMaintainDeleteDialogComponent } from './proposed-repair-and-maintain-delete-dialog.component';

@Component({
  selector: 'jhi-proposed-repair-and-maintain',
  templateUrl: './proposed-repair-and-maintain.component.html'
})
export class ProposedRepairAndMaintainComponent implements OnInit, OnDestroy {
  proposedRepairAndMaintains?: IProposedRepairAndMaintain[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected proposedRepairAndMaintainService: ProposedRepairAndMaintainService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.proposedRepairAndMaintainService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IProposedRepairAndMaintain[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
    this.registerChangeInProposedRepairAndMaintains();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProposedRepairAndMaintain): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProposedRepairAndMaintains(): void {
    this.eventSubscriber = this.eventManager.subscribe('proposedRepairAndMaintainListModification', () => this.loadPage());
  }

  delete(proposedRepairAndMaintain: IProposedRepairAndMaintain): void {
    const modalRef = this.modalService.open(ProposedRepairAndMaintainDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.proposedRepairAndMaintain = proposedRepairAndMaintain;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IProposedRepairAndMaintain[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/proposed-repair-and-maintain'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.proposedRepairAndMaintains = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}

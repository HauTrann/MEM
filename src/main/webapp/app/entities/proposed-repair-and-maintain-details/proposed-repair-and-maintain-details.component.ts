import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProposedRepairAndMaintainDetails } from 'app/shared/model/proposed-repair-and-maintain-details.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ProposedRepairAndMaintainDetailsService } from './proposed-repair-and-maintain-details.service';
import { ProposedRepairAndMaintainDetailsDeleteDialogComponent } from './proposed-repair-and-maintain-details-delete-dialog.component';

@Component({
  selector: 'jhi-proposed-repair-and-maintain-details',
  templateUrl: './proposed-repair-and-maintain-details.component.html'
})
export class ProposedRepairAndMaintainDetailsComponent implements OnInit, OnDestroy {
  proposedRepairAndMaintainDetails?: IProposedRepairAndMaintainDetails[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected proposedRepairAndMaintainDetailsService: ProposedRepairAndMaintainDetailsService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.proposedRepairAndMaintainDetailsService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IProposedRepairAndMaintainDetails[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
    this.registerChangeInProposedRepairAndMaintainDetails();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProposedRepairAndMaintainDetails): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProposedRepairAndMaintainDetails(): void {
    this.eventSubscriber = this.eventManager.subscribe('proposedRepairAndMaintainDetailsListModification', () => this.loadPage());
  }

  delete(proposedRepairAndMaintainDetails: IProposedRepairAndMaintainDetails): void {
    const modalRef = this.modalService.open(ProposedRepairAndMaintainDetailsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.proposedRepairAndMaintainDetails = proposedRepairAndMaintainDetails;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IProposedRepairAndMaintainDetails[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/proposed-repair-and-maintain-details'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.proposedRepairAndMaintainDetails = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}

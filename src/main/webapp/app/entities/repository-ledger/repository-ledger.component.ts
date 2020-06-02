import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRepositoryLedger } from 'app/shared/model/repository-ledger.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { RepositoryLedgerService } from './repository-ledger.service';
import { RepositoryLedgerDeleteDialogComponent } from './repository-ledger-delete-dialog.component';

@Component({
  selector: 'jhi-repository-ledger',
  templateUrl: './repository-ledger.component.html'
})
export class RepositoryLedgerComponent implements OnInit, OnDestroy {
  repositoryLedgers: IRepositoryLedger[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected repositoryLedgerService: RepositoryLedgerService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.repositoryLedgers = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.repositoryLedgerService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IRepositoryLedger[]>) => this.paginateRepositoryLedgers(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.repositoryLedgers = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRepositoryLedgers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRepositoryLedger): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRepositoryLedgers(): void {
    this.eventSubscriber = this.eventManager.subscribe('repositoryLedgerListModification', () => this.reset());
  }

  delete(repositoryLedger: IRepositoryLedger): void {
    const modalRef = this.modalService.open(RepositoryLedgerDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.repositoryLedger = repositoryLedger;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateRepositoryLedgers(data: IRepositoryLedger[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.repositoryLedgers.push(data[i]);
      }
    }
  }
}

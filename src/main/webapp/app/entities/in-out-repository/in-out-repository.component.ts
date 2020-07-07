import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInOutRepository } from 'app/shared/model/in-out-repository.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { InOutRepositoryService } from './in-out-repository.service';
import { InOutRepositoryDeleteDialogComponent } from './in-out-repository-delete-dialog.component';
import { RepositoryLedgerService } from 'app/entities/repository-ledger/repository-ledger.service';
import { UtilsService } from 'app/entities/utils/utils.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'jhi-in-out-repository',
  templateUrl: './in-out-repository.component.html'
})
export class InOutRepositoryComponent implements OnInit, OnDestroy {
  inOutRepositories?: IInOutRepository[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  isNhapKho?: boolean;
  types?: any[];

  constructor(
    protected inOutRepositoryService: InOutRepositoryService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected utilsService: UtilsService,
    protected repositoryLedgerService: RepositoryLedgerService,
    private toastr: ToastrService
  ) {
    this.isNhapKho = window.location.href.includes('in-out-repository/in');
    if (this.isNhapKho) {
      this.types = utilsService.typeNhapKho;
    } else {
      this.types = utilsService.typeXuatKho;
    }
  }

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    if (this.isNhapKho) {
      this.inOutRepositoryService
        .queryin({
          page: pageToLoad - 1,
          size: this.itemsPerPage,
          sort: this.sort()
        })
        .subscribe(
          (res: HttpResponse<IInOutRepository[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
          () => this.onError()
        );
    } else {
      this.inOutRepositoryService
        .queryout({
          page: pageToLoad - 1,
          size: this.itemsPerPage,
          sort: this.sort()
        })
        .subscribe(
          (res: HttpResponse<IInOutRepository[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
    this.registerChangeInInOutRepositories();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IInOutRepository): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInInOutRepositories(): void {
    this.eventSubscriber = this.eventManager.subscribe('inOutRepositoryListModification', () => this.loadPage());
  }

  delete(inOutRepository: IInOutRepository): void {
    const modalRef = this.modalService.open(InOutRepositoryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.inOutRepository = inOutRepository;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IInOutRepository[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (this.isNhapKho) {
      this.router.navigate(['/in-out-repository/in'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
        }
      });
    } else {
      this.router.navigate(['/in-out-repository/out'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
        }
      });
    }
    this.inOutRepositories = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }

  record(inOutRepository: IInOutRepository): void {
    this.repositoryLedgerService.record(inOutRepository.id).subscribe((res: HttpResponse<any>) => {
      if (res.body.status === 1) {
        inOutRepository.recorded = true;
      } else {
        this.toastr.error(res.body.mess);
        return;
      }
    });
  }

  unrecord(inOutRepository: IInOutRepository): void {
    this.repositoryLedgerService.unrecord(inOutRepository.id).subscribe((res: HttpResponse<any>) => {
      if (res.body.status === 1) {
        inOutRepository.recorded = false;
      }
    });
  }

  getStyle(record?: boolean): any {
    return !record
      ? {
          input: { color: 'rgba(245,122,28,1)' },
          color: 'rgba(245,122,28,1)'
        }
      : {};
  }

  getType(inOutRepository: IInOutRepository): string {
    const t = this.types?.find(n => n.status === inOutRepository.type);
    if (t) {
      return t['name'];
    } else {
      return '';
    }
  }
}

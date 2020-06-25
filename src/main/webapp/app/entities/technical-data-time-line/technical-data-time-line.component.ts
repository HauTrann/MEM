import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITechnicalDataTimeLine } from 'app/shared/model/technical-data-time-line.model';
import { TechnicalDataTimeLineService } from './technical-data-time-line.service';
import { TechnicalDataTimeLineDeleteDialogComponent } from './technical-data-time-line-delete-dialog.component';

@Component({
  selector: 'jhi-technical-data-time-line',
  templateUrl: './technical-data-time-line.component.html'
})
export class TechnicalDataTimeLineComponent implements OnInit, OnDestroy {
  technicalDataTimeLines?: ITechnicalDataTimeLine[];
  eventSubscriber?: Subscription;

  constructor(
    protected technicalDataTimeLineService: TechnicalDataTimeLineService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.technicalDataTimeLineService
      .query()
      .subscribe((res: HttpResponse<ITechnicalDataTimeLine[]>) => (this.technicalDataTimeLines = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTechnicalDataTimeLines();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITechnicalDataTimeLine): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTechnicalDataTimeLines(): void {
    this.eventSubscriber = this.eventManager.subscribe('technicalDataTimeLineListModification', () => this.loadAll());
  }

  delete(technicalDataTimeLine: ITechnicalDataTimeLine): void {
    const modalRef = this.modalService.open(TechnicalDataTimeLineDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.technicalDataTimeLine = technicalDataTimeLine;
  }
}

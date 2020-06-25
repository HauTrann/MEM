import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITechnicalDataTimeLine } from 'app/shared/model/technical-data-time-line.model';

@Component({
  selector: 'jhi-technical-data-time-line-detail',
  templateUrl: './technical-data-time-line-detail.component.html'
})
export class TechnicalDataTimeLineDetailComponent implements OnInit {
  technicalDataTimeLine: ITechnicalDataTimeLine | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ technicalDataTimeLine }) => (this.technicalDataTimeLine = technicalDataTimeLine));
  }

  previousState(): void {
    window.history.back();
  }
}

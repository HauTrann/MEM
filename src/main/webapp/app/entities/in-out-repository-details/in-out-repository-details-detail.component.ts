import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInOutRepositoryDetails } from 'app/shared/model/in-out-repository-details.model';

@Component({
  selector: 'jhi-in-out-repository-details-detail',
  templateUrl: './in-out-repository-details-detail.component.html'
})
export class InOutRepositoryDetailsDetailComponent implements OnInit {
  inOutRepositoryDetails: IInOutRepositoryDetails | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inOutRepositoryDetails }) => (this.inOutRepositoryDetails = inOutRepositoryDetails));
  }

  previousState(): void {
    window.history.back();
  }
}

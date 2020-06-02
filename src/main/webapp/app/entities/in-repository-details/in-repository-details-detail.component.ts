import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInRepositoryDetails } from 'app/shared/model/in-repository-details.model';

@Component({
  selector: 'jhi-in-repository-details-detail',
  templateUrl: './in-repository-details-detail.component.html'
})
export class InRepositoryDetailsDetailComponent implements OnInit {
  inRepositoryDetails: IInRepositoryDetails | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inRepositoryDetails }) => (this.inRepositoryDetails = inRepositoryDetails));
  }

  previousState(): void {
    window.history.back();
  }
}

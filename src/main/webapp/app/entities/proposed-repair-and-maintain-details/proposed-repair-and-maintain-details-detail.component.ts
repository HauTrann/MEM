import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProposedRepairAndMaintainDetails } from 'app/shared/model/proposed-repair-and-maintain-details.model';

@Component({
  selector: 'jhi-proposed-repair-and-maintain-details-detail',
  templateUrl: './proposed-repair-and-maintain-details-detail.component.html'
})
export class ProposedRepairAndMaintainDetailsDetailComponent implements OnInit {
  proposedRepairAndMaintainDetails: IProposedRepairAndMaintainDetails | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      ({ proposedRepairAndMaintainDetails }) => (this.proposedRepairAndMaintainDetails = proposedRepairAndMaintainDetails)
    );
  }

  previousState(): void {
    window.history.back();
  }
}

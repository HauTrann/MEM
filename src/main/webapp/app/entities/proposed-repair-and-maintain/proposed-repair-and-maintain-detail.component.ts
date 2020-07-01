import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProposedRepairAndMaintain } from 'app/shared/model/proposed-repair-and-maintain.model';

@Component({
  selector: 'jhi-proposed-repair-and-maintain-detail',
  templateUrl: './proposed-repair-and-maintain-detail.component.html'
})
export class ProposedRepairAndMaintainDetailComponent implements OnInit {
  proposedRepairAndMaintain: IProposedRepairAndMaintain | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ proposedRepairAndMaintain }) => (this.proposedRepairAndMaintain = proposedRepairAndMaintain));
  }

  previousState(): void {
    window.history.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRepositoryLedger } from 'app/shared/model/repository-ledger.model';

@Component({
  selector: 'jhi-repository-ledger-detail',
  templateUrl: './repository-ledger-detail.component.html'
})
export class RepositoryLedgerDetailComponent implements OnInit {
  repositoryLedger: IRepositoryLedger | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ repositoryLedger }) => (this.repositoryLedger = repositoryLedger));
  }

  previousState(): void {
    window.history.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInRepository } from 'app/shared/model/in-repository.model';

@Component({
  selector: 'jhi-in-repository-detail',
  templateUrl: './in-repository-detail.component.html'
})
export class InRepositoryDetailComponent implements OnInit {
  inRepository: IInRepository | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inRepository }) => (this.inRepository = inRepository));
  }

  previousState(): void {
    window.history.back();
  }
}

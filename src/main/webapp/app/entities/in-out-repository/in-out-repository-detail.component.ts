import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInOutRepository } from 'app/shared/model/in-out-repository.model';

@Component({
  selector: 'jhi-in-out-repository-detail',
  templateUrl: './in-out-repository-detail.component.html'
})
export class InOutRepositoryDetailComponent implements OnInit {
  inOutRepository: IInOutRepository | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inOutRepository }) => (this.inOutRepository = inOutRepository));
  }

  previousState(): void {
    window.history.back();
  }
}

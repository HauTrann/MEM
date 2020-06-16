import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { SERVER_API_URL } from 'app/app.constants';
import { IRepository } from 'app/shared/model/repository.model';

type EntityResponseType = HttpResponse<IRepository>;
type EntityArrayResponseType = HttpResponse<IRepository[]>;

@Injectable({ providedIn: 'root' })
export class ReportService {
  public resourceUrl = SERVER_API_URL + 'api/report';

  constructor(protected http: HttpClient) {}
}

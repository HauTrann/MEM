import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRepositoryLedger } from 'app/shared/model/repository-ledger.model';

type EntityResponseType = HttpResponse<IRepositoryLedger>;
type EntityArrayResponseType = HttpResponse<IRepositoryLedger[]>;

@Injectable({ providedIn: 'root' })
export class RepositoryLedgerService {
  public resourceUrl = SERVER_API_URL + 'api/repository-ledgers';

  constructor(protected http: HttpClient) {}

  create(repositoryLedger: IRepositoryLedger): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(repositoryLedger);
    return this.http
      .post<IRepositoryLedger>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(repositoryLedger: IRepositoryLedger): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(repositoryLedger);
    return this.http
      .put<IRepositoryLedger>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRepositoryLedger>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRepositoryLedger[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(repositoryLedger: IRepositoryLedger): IRepositoryLedger {
    const copy: IRepositoryLedger = Object.assign({}, repositoryLedger, {
      date: repositoryLedger.date && repositoryLedger.date.isValid() ? repositoryLedger.date.format(DATE_FORMAT) : undefined,
      postedDate:
        repositoryLedger.postedDate && repositoryLedger.postedDate.isValid() ? repositoryLedger.postedDate.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
      res.body.postedDate = res.body.postedDate ? moment(res.body.postedDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((repositoryLedger: IRepositoryLedger) => {
        repositoryLedger.date = repositoryLedger.date ? moment(repositoryLedger.date) : undefined;
        repositoryLedger.postedDate = repositoryLedger.postedDate ? moment(repositoryLedger.postedDate) : undefined;
      });
    }
    return res;
  }
}

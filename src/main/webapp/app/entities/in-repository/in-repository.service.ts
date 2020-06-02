import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IInRepository } from 'app/shared/model/in-repository.model';

type EntityResponseType = HttpResponse<IInRepository>;
type EntityArrayResponseType = HttpResponse<IInRepository[]>;

@Injectable({ providedIn: 'root' })
export class InRepositoryService {
  public resourceUrl = SERVER_API_URL + 'api/in-repositories';

  constructor(protected http: HttpClient) {}

  create(inRepository: IInRepository): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(inRepository);
    return this.http
      .post<IInRepository>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(inRepository: IInRepository): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(inRepository);
    return this.http
      .put<IInRepository>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IInRepository>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IInRepository[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(inRepository: IInRepository): IInRepository {
    const copy: IInRepository = Object.assign({}, inRepository, {
      date: inRepository.date && inRepository.date.isValid() ? inRepository.date.format(DATE_FORMAT) : undefined,
      postedDate: inRepository.postedDate && inRepository.postedDate.isValid() ? inRepository.postedDate.format(DATE_FORMAT) : undefined
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
      res.body.forEach((inRepository: IInRepository) => {
        inRepository.date = inRepository.date ? moment(inRepository.date) : undefined;
        inRepository.postedDate = inRepository.postedDate ? moment(inRepository.postedDate) : undefined;
      });
    }
    return res;
  }
}

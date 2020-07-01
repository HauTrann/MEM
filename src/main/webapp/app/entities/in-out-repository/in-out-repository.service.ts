import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IInOutRepository } from 'app/shared/model/in-out-repository.model';

type EntityResponseType = HttpResponse<IInOutRepository>;
type EntityArrayResponseType = HttpResponse<IInOutRepository[]>;

@Injectable({ providedIn: 'root' })
export class InOutRepositoryService {
  public resourceUrl = SERVER_API_URL + 'api/in-out-repositories';

  constructor(protected http: HttpClient) {}

  create(inOutRepository: IInOutRepository): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(inOutRepository);
    return this.http
      .post<IInOutRepository>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(inOutRepository: IInOutRepository): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(inOutRepository);
    return this.http
      .put<IInOutRepository>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IInOutRepository>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IInOutRepository[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryin(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IInOutRepository[]>(this.resourceUrl + '/in', { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryout(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IInOutRepository[]>(this.resourceUrl + '/out', { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  count(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any>(this.resourceUrl + '/getno', { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(inOutRepository: IInOutRepository): IInOutRepository {
    const copy: IInOutRepository = Object.assign({}, inOutRepository, {
      date: inOutRepository.date && inOutRepository.date.isValid() ? inOutRepository.date.format(DATE_TIME_FORMAT) : undefined,
      postedDate:
        inOutRepository.postedDate && inOutRepository.postedDate.isValid() ? inOutRepository.postedDate.format(DATE_TIME_FORMAT) : undefined
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
      res.body.forEach((inOutRepository: IInOutRepository) => {
        inOutRepository.date = inOutRepository.date ? moment(inOutRepository.date) : undefined;
        inOutRepository.postedDate = inOutRepository.postedDate ? moment(inOutRepository.postedDate) : undefined;
      });
    }
    return res;
  }
}

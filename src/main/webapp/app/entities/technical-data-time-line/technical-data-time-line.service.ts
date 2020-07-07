import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITechnicalDataTimeLine } from 'app/shared/model/technical-data-time-line.model';

type EntityResponseType = HttpResponse<ITechnicalDataTimeLine>;
type EntityArrayResponseType = HttpResponse<ITechnicalDataTimeLine[]>;

@Injectable({ providedIn: 'root' })
export class TechnicalDataTimeLineService {
  public resourceUrl = SERVER_API_URL + 'api/technical-data-time-lines';

  constructor(protected http: HttpClient) {}

  create(technicalDataTimeLine: ITechnicalDataTimeLine): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(technicalDataTimeLine);
    return this.http
      .post<ITechnicalDataTimeLine>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(technicalDataTimeLine: ITechnicalDataTimeLine): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(technicalDataTimeLine);
    return this.http
      .put<ITechnicalDataTimeLine>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITechnicalDataTimeLine>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITechnicalDataTimeLine[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  getNoww(serial?: string): Observable<EntityArrayResponseType> {
    const req = { serial };
    const options = createRequestOption(req);
    return this.http
      .get<ITechnicalDataTimeLine[]>(this.resourceUrl + '/get-now/' + req.serial, {
        params: options,
        observe: 'response'
      })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(technicalDataTimeLine: ITechnicalDataTimeLine): ITechnicalDataTimeLine {
    const copy: ITechnicalDataTimeLine = Object.assign({}, technicalDataTimeLine, {
      time:
        technicalDataTimeLine.time && technicalDataTimeLine.time.isValid() ? technicalDataTimeLine.time.format(DATE_TIME_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.time = res.body.time ? moment(res.body.time, DATE_TIME_FORMAT) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((technicalDataTimeLine: ITechnicalDataTimeLine) => {
        technicalDataTimeLine.time = technicalDataTimeLine.time ? moment(technicalDataTimeLine.time, DATE_TIME_FORMAT) : undefined;
      });
    }
    return res;
  }
}

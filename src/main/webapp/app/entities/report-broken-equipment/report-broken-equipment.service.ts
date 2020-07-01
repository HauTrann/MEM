import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IReportBrokenEquipment } from 'app/shared/model/report-broken-equipment.model';

type EntityResponseType = HttpResponse<IReportBrokenEquipment>;
type EntityArrayResponseType = HttpResponse<IReportBrokenEquipment[]>;

@Injectable({ providedIn: 'root' })
export class ReportBrokenEquipmentService {
  public resourceUrl = SERVER_API_URL + 'api/report-broken-equipments';

  constructor(protected http: HttpClient) {}

  create(reportBrokenEquipment: IReportBrokenEquipment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reportBrokenEquipment);
    return this.http
      .post<IReportBrokenEquipment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(reportBrokenEquipment: IReportBrokenEquipment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reportBrokenEquipment);
    return this.http
      .put<IReportBrokenEquipment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IReportBrokenEquipment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IReportBrokenEquipment[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(reportBrokenEquipment: IReportBrokenEquipment): IReportBrokenEquipment {
    const copy: IReportBrokenEquipment = Object.assign({}, reportBrokenEquipment, {
      time: reportBrokenEquipment.time && reportBrokenEquipment.time.isValid() ? reportBrokenEquipment.time.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.time = res.body.time ? moment(res.body.time) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((reportBrokenEquipment: IReportBrokenEquipment) => {
        reportBrokenEquipment.time = reportBrokenEquipment.time ? moment(reportBrokenEquipment.time) : undefined;
      });
    }
    return res;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRequestReceiveDevice } from 'app/shared/model/request-receive-device.model';

type EntityResponseType = HttpResponse<IRequestReceiveDevice>;
type EntityArrayResponseType = HttpResponse<IRequestReceiveDevice[]>;

@Injectable({ providedIn: 'root' })
export class RequestReceiveDeviceService {
  public resourceUrl = SERVER_API_URL + 'api/request-receive-devices';

  constructor(protected http: HttpClient) {}

  create(requestReceiveDevice: IRequestReceiveDevice): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(requestReceiveDevice);
    return this.http
      .post<IRequestReceiveDevice>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(requestReceiveDevice: IRequestReceiveDevice): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(requestReceiveDevice);
    return this.http
      .put<IRequestReceiveDevice>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRequestReceiveDevice>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRequestReceiveDevice[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryForManager(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRequestReceiveDevice[]>(this.resourceUrl + '/for-manager', { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryForManagerForEmployee(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRequestReceiveDevice[]>(this.resourceUrl + '/for-employee', { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryForManagerPay(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRequestReceiveDevice[]>(this.resourceUrl + '/for-manager-pay', { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryForManagerForEmployeePay(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRequestReceiveDevice[]>(this.resourceUrl + '/for-employee-pay', { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(requestReceiveDevice: IRequestReceiveDevice): IRequestReceiveDevice {
    const copy: IRequestReceiveDevice = Object.assign({}, requestReceiveDevice, {
      requestDate:
        requestReceiveDevice.requestDate && requestReceiveDevice.requestDate.isValid()
          ? requestReceiveDevice.requestDate.format(DATE_TIME_FORMAT)
          : undefined,
      dateOfDelivery:
        requestReceiveDevice.dateOfDelivery && requestReceiveDevice.dateOfDelivery.isValid()
          ? requestReceiveDevice.dateOfDelivery.format(DATE_TIME_FORMAT)
          : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.requestDate = res.body.requestDate ? moment(res.body.requestDate) : undefined;
      res.body.dateOfDelivery = res.body.dateOfDelivery ? moment(res.body.dateOfDelivery) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((requestReceiveDevice: IRequestReceiveDevice) => {
        requestReceiveDevice.requestDate = requestReceiveDevice.requestDate ? moment(requestReceiveDevice.requestDate) : undefined;
        requestReceiveDevice.dateOfDelivery = requestReceiveDevice.dateOfDelivery ? moment(requestReceiveDevice.dateOfDelivery) : undefined;
      });
    }
    return res;
  }
}

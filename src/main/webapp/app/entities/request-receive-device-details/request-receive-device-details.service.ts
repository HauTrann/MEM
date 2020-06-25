import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRequestReceiveDeviceDetails } from 'app/shared/model/request-receive-device-details.model';

type EntityResponseType = HttpResponse<IRequestReceiveDeviceDetails>;
type EntityArrayResponseType = HttpResponse<IRequestReceiveDeviceDetails[]>;

@Injectable({ providedIn: 'root' })
export class RequestReceiveDeviceDetailsService {
  public resourceUrl = SERVER_API_URL + 'api/request-receive-device-details';

  constructor(protected http: HttpClient) {}

  create(requestReceiveDeviceDetails: IRequestReceiveDeviceDetails): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(requestReceiveDeviceDetails);
    return this.http
      .post<IRequestReceiveDeviceDetails>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(requestReceiveDeviceDetails: IRequestReceiveDeviceDetails): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(requestReceiveDeviceDetails);
    return this.http
      .put<IRequestReceiveDeviceDetails>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRequestReceiveDeviceDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRequestReceiveDeviceDetails[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(requestReceiveDeviceDetails: IRequestReceiveDeviceDetails): IRequestReceiveDeviceDetails {
    const copy: IRequestReceiveDeviceDetails = Object.assign({}, requestReceiveDeviceDetails, {
      expiryDate:
        requestReceiveDeviceDetails.expiryDate && requestReceiveDeviceDetails.expiryDate.isValid()
          ? requestReceiveDeviceDetails.expiryDate.format(DATE_FORMAT)
          : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.expiryDate = res.body.expiryDate ? moment(res.body.expiryDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((requestReceiveDeviceDetails: IRequestReceiveDeviceDetails) => {
        requestReceiveDeviceDetails.expiryDate = requestReceiveDeviceDetails.expiryDate
          ? moment(requestReceiveDeviceDetails.expiryDate)
          : undefined;
      });
    }
    return res;
  }
}

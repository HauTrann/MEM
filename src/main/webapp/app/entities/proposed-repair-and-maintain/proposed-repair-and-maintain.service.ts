import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProposedRepairAndMaintain } from 'app/shared/model/proposed-repair-and-maintain.model';

type EntityResponseType = HttpResponse<IProposedRepairAndMaintain>;
type EntityArrayResponseType = HttpResponse<IProposedRepairAndMaintain[]>;

@Injectable({ providedIn: 'root' })
export class ProposedRepairAndMaintainService {
  public resourceUrl = SERVER_API_URL + 'api/proposed-repair-and-maintains';

  constructor(protected http: HttpClient) {}

  create(proposedRepairAndMaintain: IProposedRepairAndMaintain): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(proposedRepairAndMaintain);
    return this.http
      .post<IProposedRepairAndMaintain>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(proposedRepairAndMaintain: IProposedRepairAndMaintain): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(proposedRepairAndMaintain);
    return this.http
      .put<IProposedRepairAndMaintain>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProposedRepairAndMaintain>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProposedRepairAndMaintain[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(proposedRepairAndMaintain: IProposedRepairAndMaintain): IProposedRepairAndMaintain {
    const copy: IProposedRepairAndMaintain = Object.assign({}, proposedRepairAndMaintain, {
      proposedDate:
        proposedRepairAndMaintain.proposedDate && proposedRepairAndMaintain.proposedDate.isValid()
          ? proposedRepairAndMaintain.proposedDate.format(DATE_FORMAT)
          : undefined,
      validationDate:
        proposedRepairAndMaintain.validationDate && proposedRepairAndMaintain.validationDate.isValid()
          ? proposedRepairAndMaintain.validationDate.format(DATE_FORMAT)
          : undefined,
      finishDate:
        proposedRepairAndMaintain.finishDate && proposedRepairAndMaintain.finishDate.isValid()
          ? proposedRepairAndMaintain.finishDate.format(DATE_FORMAT)
          : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.proposedDate = res.body.proposedDate ? moment(res.body.proposedDate) : undefined;
      res.body.validationDate = res.body.validationDate ? moment(res.body.validationDate) : undefined;
      res.body.finishDate = res.body.finishDate ? moment(res.body.finishDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((proposedRepairAndMaintain: IProposedRepairAndMaintain) => {
        proposedRepairAndMaintain.proposedDate = proposedRepairAndMaintain.proposedDate
          ? moment(proposedRepairAndMaintain.proposedDate)
          : undefined;
        proposedRepairAndMaintain.validationDate = proposedRepairAndMaintain.validationDate
          ? moment(proposedRepairAndMaintain.validationDate)
          : undefined;
        proposedRepairAndMaintain.finishDate = proposedRepairAndMaintain.finishDate
          ? moment(proposedRepairAndMaintain.finishDate)
          : undefined;
      });
    }
    return res;
  }
}

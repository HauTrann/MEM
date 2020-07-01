import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProposedRepairAndMaintainDetails } from 'app/shared/model/proposed-repair-and-maintain-details.model';

type EntityResponseType = HttpResponse<IProposedRepairAndMaintainDetails>;
type EntityArrayResponseType = HttpResponse<IProposedRepairAndMaintainDetails[]>;

@Injectable({ providedIn: 'root' })
export class ProposedRepairAndMaintainDetailsService {
  public resourceUrl = SERVER_API_URL + 'api/proposed-repair-and-maintain-details';

  constructor(protected http: HttpClient) {}

  create(proposedRepairAndMaintainDetails: IProposedRepairAndMaintainDetails): Observable<EntityResponseType> {
    return this.http.post<IProposedRepairAndMaintainDetails>(this.resourceUrl, proposedRepairAndMaintainDetails, { observe: 'response' });
  }

  update(proposedRepairAndMaintainDetails: IProposedRepairAndMaintainDetails): Observable<EntityResponseType> {
    return this.http.put<IProposedRepairAndMaintainDetails>(this.resourceUrl, proposedRepairAndMaintainDetails, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProposedRepairAndMaintainDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProposedRepairAndMaintainDetails[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

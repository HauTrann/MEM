import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IInOutRepositoryDetails } from 'app/shared/model/in-out-repository-details.model';

type EntityResponseType = HttpResponse<IInOutRepositoryDetails>;
type EntityArrayResponseType = HttpResponse<IInOutRepositoryDetails[]>;

@Injectable({ providedIn: 'root' })
export class InOutRepositoryDetailsService {
  public resourceUrl = SERVER_API_URL + 'api/in-out-repository-details';

  constructor(protected http: HttpClient) {}

  create(inOutRepositoryDetails: IInOutRepositoryDetails): Observable<EntityResponseType> {
    return this.http.post<IInOutRepositoryDetails>(this.resourceUrl, inOutRepositoryDetails, { observe: 'response' });
  }

  update(inOutRepositoryDetails: IInOutRepositoryDetails): Observable<EntityResponseType> {
    return this.http.put<IInOutRepositoryDetails>(this.resourceUrl, inOutRepositoryDetails, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInOutRepositoryDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInOutRepositoryDetails[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

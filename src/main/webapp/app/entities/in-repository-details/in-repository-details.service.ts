import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IInRepositoryDetails } from 'app/shared/model/in-repository-details.model';

type EntityResponseType = HttpResponse<IInRepositoryDetails>;
type EntityArrayResponseType = HttpResponse<IInRepositoryDetails[]>;

@Injectable({ providedIn: 'root' })
export class InRepositoryDetailsService {
  public resourceUrl = SERVER_API_URL + 'api/in-repository-details';

  constructor(protected http: HttpClient) {}

  create(inRepositoryDetails: IInRepositoryDetails): Observable<EntityResponseType> {
    return this.http.post<IInRepositoryDetails>(this.resourceUrl, inRepositoryDetails, { observe: 'response' });
  }

  update(inRepositoryDetails: IInRepositoryDetails): Observable<EntityResponseType> {
    return this.http.put<IInRepositoryDetails>(this.resourceUrl, inRepositoryDetails, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInRepositoryDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInRepositoryDetails[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

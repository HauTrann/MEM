import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRepository } from 'app/shared/model/repository.model';

type EntityResponseType = HttpResponse<IRepository>;
type EntityArrayResponseType = HttpResponse<IRepository[]>;

@Injectable({ providedIn: 'root' })
export class RepositoryService {
  public resourceUrl = SERVER_API_URL + 'api/repositories';

  constructor(protected http: HttpClient) {}

  create(repository: IRepository): Observable<EntityResponseType> {
    return this.http.post<IRepository>(this.resourceUrl, repository, { observe: 'response' });
  }

  update(repository: IRepository): Observable<EntityResponseType> {
    return this.http.put<IRepository>(this.resourceUrl, repository, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRepository>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRepository[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

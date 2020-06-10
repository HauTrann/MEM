import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEquipment } from 'app/shared/model/equipment.model';
import { DeviceModel } from 'app/entities/in-out-repository/device.model';

type EntityResponseType = HttpResponse<IEquipment>;
type EntityArrayResponseType = HttpResponse<IEquipment[]>;

@Injectable({ providedIn: 'root' })
export class EquipmentService {
  public resourceUrl = SERVER_API_URL + 'api/equipment';

  constructor(protected http: HttpClient) {}

  create(equipment: IEquipment): Observable<EntityResponseType> {
    return this.http.post<IEquipment>(this.resourceUrl, equipment, { observe: 'response' });
  }

  update(equipment: IEquipment): Observable<EntityResponseType> {
    return this.http.put<IEquipment>(this.resourceUrl, equipment, { observe: 'response' });
  }

  findAllbyCodeText(text: string): Observable<HttpResponse<DeviceModel[]>> {
    return this.http.get<DeviceModel[]>(SERVER_API_URL + 'api/device/find', { params: { text }, observe: 'response' });
  }

  findAllDevice(): Observable<HttpResponse<DeviceModel[]>> {
    return this.http.get<DeviceModel[]>(SERVER_API_URL + 'api/device/findAll', { params: {}, observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEquipment>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEquipment[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

import { Moment } from 'moment';

export interface IRequestReceiveDeviceDetails {
  id?: number;
  requestReceiveDeviceID?: number;
  serial?: string;
  prodID?: number;
  prodName?: string;
  quantity?: number;
  unit?: string;
  unitPrice?: number;
  amount?: number;
  repositoryID?: number;
  lotNo?: string;
  expiryDate?: Moment;
}

export class RequestReceiveDeviceDetails implements IRequestReceiveDeviceDetails {
  constructor(
    public id?: number,
    public requestReceiveDeviceID?: number,
    public serial?: string,
    public prodID?: number,
    public prodName?: string,
    public quantity?: number,
    public unit?: string,
    public unitPrice?: number,
    public amount?: number,
    public repositoryID?: number,
    public lotNo?: string,
    public expiryDate?: Moment
  ) {}
}

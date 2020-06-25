import { Moment } from 'moment';
import { RequestReceiveDeviceDetails } from 'app/shared/model/request-receive-device-details.model';

export interface IRequestReceiveDevice {
  id?: number;
  organizationUnitID?: number;
  userID?: number;
  requestDate?: Moment;
  dateOfDelivery?: Moment;
  description?: string;
  userName?: string;
  departmentName?: string;
  status?: number;
  isPay?: boolean;
  requestReceiveDeviceDetails?: RequestReceiveDeviceDetails[];
}

export class RequestReceiveDevice implements IRequestReceiveDevice {
  constructor(
    public id?: number,
    public organizationUnitID?: number,
    public userID?: number,
    public requestDate?: Moment,
    public dateOfDelivery?: Moment,
    public description?: string,
    public userName?: string,
    public departmentName?: string,
    public status?: number,
    public isPay?: boolean,
    public requestReceiveDeviceDetails?: RequestReceiveDeviceDetails[]
  ) {}
}

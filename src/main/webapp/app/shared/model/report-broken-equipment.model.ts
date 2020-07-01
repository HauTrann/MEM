import { Moment } from 'moment';

export interface IReportBrokenEquipment {
  id?: number;
  prodID?: number;
  serial?: string;
  description?: string;
  status?: number;
  userID?: number;
  time?: Moment;
  organizationUnitID?: number;
  prodName?: string;
}

export class ReportBrokenEquipment implements IReportBrokenEquipment {
  constructor(
    public id?: number,
    public prodID?: number,
    public serial?: string,
    public description?: string,
    public status?: number,
    public userID?: number,
    public time?: Moment,
    public organizationUnitID?: number,
    public prodName?: string
  ) {}
}

import { Moment } from 'moment';

export interface IRepositoryLedger {
  id?: number;
  organizationUnitID?: number;
  refID?: number;
  detailID?: number;
  date?: Moment;
  postedDate?: Moment;
  no?: string;
  deliver?: string;
  phoneContact?: string;
  quantity?: number;
  unit?: string;
  unitPrice?: number;
  amount?: number;
  outOfStock?: boolean;
}

export class RepositoryLedger implements IRepositoryLedger {
  constructor(
    public id?: number,
    public organizationUnitID?: number,
    public refID?: number,
    public detailID?: number,
    public date?: Moment,
    public postedDate?: Moment,
    public no?: string,
    public deliver?: string,
    public phoneContact?: string,
    public quantity?: number,
    public unit?: string,
    public unitPrice?: number,
    public amount?: number,
    public outOfStock?: boolean
  ) {
    this.outOfStock = this.outOfStock || false;
  }
}

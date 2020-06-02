import { Moment } from 'moment';

export interface IInOutRepository {
  id?: number;
  organizationUnitID?: number;
  date?: Moment;
  postedDate?: Moment;
  no?: string;
  deliver?: string;
  phoneContact?: string;
  outOfStock?: boolean;
  recorded?: boolean;
}

export class InOutRepository implements IInOutRepository {
  constructor(
    public id?: number,
    public organizationUnitID?: number,
    public date?: Moment,
    public postedDate?: Moment,
    public no?: string,
    public deliver?: string,
    public phoneContact?: string,
    public outOfStock?: boolean,
    public recorded?: boolean
  ) {
    this.outOfStock = this.outOfStock || false;
    this.recorded = this.recorded || false;
  }
}

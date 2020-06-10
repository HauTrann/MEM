import { Moment } from 'moment';
import { InOutRepositoryDetails } from 'app/shared/model/in-out-repository-details.model';

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
  reason?: string;
  inOutRepositoryDetails?: InOutRepositoryDetails[];
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
    public recorded?: boolean,
    public reason?: string,
    public inOutRepositoryDetails?: InOutRepositoryDetails[]
  ) {
    this.outOfStock = this.outOfStock || false;
    this.recorded = this.recorded || false;
  }
}

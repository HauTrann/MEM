import { Moment } from 'moment';
import { TechnicalDataModel } from 'app/entities/equipment/technical-data.model';

export interface IInOutRepositoryDetails {
  id?: number;
  prodID?: number;
  prodName?: string;
  quantity?: number;
  unit?: string;
  unitPrice?: number;
  amount?: number;
  repositoryID?: number;
  lotNo?: string;
  serial?: string;
  expiryDate?: Moment;
  devi?: Moment;
  technicalDataModel?: TechnicalDataModel[];
}

export class InOutRepositoryDetails implements IInOutRepositoryDetails {
  constructor(
    public id?: number,
    public prodID?: number,
    public prodName?: string,
    public quantity?: number,
    public unit?: string,
    public unitPrice?: number,
    public amount?: number,
    public repositoryID?: number,
    public lotNo?: string,
    public serial?: string,
    public expiryDate?: Moment,
    public technicalDataModel?: TechnicalDataModel[]
  ) {}
}

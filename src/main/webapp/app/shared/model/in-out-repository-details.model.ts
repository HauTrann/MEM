import { Moment } from 'moment';

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
  expiryDate?: Moment;
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
    public expiryDate?: Moment
  ) {}
}

export interface IInOutRepositoryDetails {
  id?: number;
  prodID?: number;
  prodName?: string;
  quantity?: number;
  unit?: string;
  unitPrice?: number;
  amount?: number;
}

export class InOutRepositoryDetails implements IInOutRepositoryDetails {
  constructor(
    public id?: number,
    public prodID?: number,
    public prodName?: string,
    public quantity?: number,
    public unit?: string,
    public unitPrice?: number,
    public amount?: number
  ) {}
}

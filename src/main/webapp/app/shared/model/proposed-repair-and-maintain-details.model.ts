export interface IProposedRepairAndMaintainDetails {
  id?: number;
  proposedRepairAndMaintainID?: number;
  serial?: string;
  prodID?: number;
  prodName?: string;
  quantity?: number;
  unit?: string;
  repositoryID?: number;
}

export class ProposedRepairAndMaintainDetails implements IProposedRepairAndMaintainDetails {
  constructor(
    public id?: number,
    public proposedRepairAndMaintainID?: number,
    public serial?: string,
    public prodID?: number,
    public prodName?: string,
    public quantity?: number,
    public unit?: string,
    public repositoryID?: number
  ) {}
}

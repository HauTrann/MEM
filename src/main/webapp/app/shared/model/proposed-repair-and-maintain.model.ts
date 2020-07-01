import { Moment } from 'moment';

export interface IProposedRepairAndMaintain {
  id?: number;
  organizationUnitID?: number;
  userID?: number;
  description?: string;
  proposedDate?: Moment;
  validationDate?: Moment;
  finishDate?: Moment;
  status?: number;
}

export class ProposedRepairAndMaintain implements IProposedRepairAndMaintain {
  constructor(
    public id?: number,
    public organizationUnitID?: number,
    public userID?: number,
    public description?: string,
    public proposedDate?: Moment,
    public validationDate?: Moment,
    public finishDate?: Moment,
    public status?: number
  ) {}
}

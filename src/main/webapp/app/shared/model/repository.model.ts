export interface IRepository {
  id?: number;
  organizationUnitID?: number;
  code?: string;
  name?: string;
  description?: string;
  status?: number;
}

export class Repository implements IRepository {
  constructor(
    public id?: number,
    public organizationUnitID?: number,
    public code?: string,
    public name?: string,
    public description?: string,
    public status?: number
  ) {}
}

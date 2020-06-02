export interface IDepartment {
  id?: number;
  organizationUnitID?: number;
  name?: string;
  description?: string;
  status?: number;
}

export class Department implements IDepartment {
  constructor(
    public id?: number,
    public organizationUnitID?: number,
    public name?: string,
    public description?: string,
    public status?: number
  ) {}
}

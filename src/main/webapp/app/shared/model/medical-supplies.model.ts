export interface IMedicalSupplies {
  id?: number;
  organizationUnitID?: number;
  code?: string;
  name?: string;
  medicalSuppliesTypeID?: number;
  description?: string;
  status?: number;
  medicalSuppliesTypeName?: string;
  repositoryName?: string;
  totalIW?: number;
  totalOW?: number;
}

export class MedicalSupplies implements IMedicalSupplies {
  constructor(
    public id?: number,
    public organizationUnitID?: number,
    public code?: string,
    public name?: string,
    public medicalSuppliesTypeID?: number,
    public description?: string,
    public status?: number,
    public medicalSuppliesTypeName?: string,
    public repositoryName?: string,
    public totalIW?: number,
    public totalOW?: number
  ) {}
}

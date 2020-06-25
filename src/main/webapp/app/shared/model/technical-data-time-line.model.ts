import { Moment } from 'moment';

export interface ITechnicalDataTimeLine {
  id?: number;
  name?: string;
  value?: string;
  equipmentID?: number;
  time?: Moment;
  serial?: string;
  userID?: number;
}

export class TechnicalDataTimeLine implements ITechnicalDataTimeLine {
  constructor(
    public id?: number,
    public name?: string,
    public value?: string,
    public equipmentID?: number,
    public time?: Moment,
    public serial?: string,
    public userID?: number
  ) {}
}

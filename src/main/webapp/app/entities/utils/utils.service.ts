import { Injectable } from '@angular/core';
import { TechnicalDataModel } from 'app/entities/equipment/technical-data.model';

@Injectable({ providedIn: 'root' })
export class UtilsService {
  public statuss: any[] = [
    {
      status: 0,
      name: 'Không hoạt động'
    },
    {
      status: 1,
      name: 'Hoạt động'
    }
  ];

  public groups: any[] = [
    {
      value: 'A',
      name: 'A'
    },
    {
      value: 'B',
      name: 'B'
    },
    {
      value: 'C',
      name: 'C'
    },
    {
      value: 'D',
      name: 'D'
    }
  ];

  public getStatus(status: number | undefined): string {
    if (status === 1) {
      return 'Hoạt động';
    } else {
      return 'Không hoạt động';
    }
  }

  public newArr(lenght: number): any[] {
    if (lenght > 0) {
      return new Array(lenght);
    } else {
      return new Array(0);
    }
  }

  public thongSoKyThuatDefault(): TechnicalDataModel[] {
    const tsky: TechnicalDataModel[] = [];
    tsky.push({
      name: 'Hãng'
    });

    return tsky;
  }
}

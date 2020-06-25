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

  public statussRequest: any[] = [
    {
      status: 0,
      name: 'Chờ xử lý'
    },
    {
      status: 1,
      name: 'Đang xử lý'
    },
    {
      status: 2,
      name: 'Không thành công'
    },
    {
      status: 3,
      name: 'Thành công'
    }
  ];

  public typeXuatKho: any[] = [
    {
      status: 0,
      name: 'Xuất kho(bán hàng)'
    },
    {
      status: 1,
      name: 'Xuất kho(nhân viên mượn thiết bị)'
    },
    {
      status: 2,
      name: 'Xuất kho(cho phòng ban)'
    },
    {
      status: 3,
      name: 'Khác'
    }
  ];

  public typeNhapKho: any[] = [
    {
      status: 0,
      name: 'Nhập kho (mua hàng)'
    },
    {
      status: 1,
      name: 'Nhập kho(nhân viên trả thiết bị)'
    },
    {
      status: 2,
      name: 'Nhập kho(Phòng ban trả thiết bị)'
    },
    {
      status: 3,
      name: 'Khác'
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

  public pad(num: string, size: number): string {
    let s = (num ? num : '') + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  }

  public getStatus(status: number | undefined): string {
    if (status === 1) {
      return 'Hoạt động';
    } else {
      return 'Không hoạt động';
    }
  }

  public getStatussRequest(status: number | undefined): string {
    switch (status) {
      case 0:
        return 'Chờ xử lý';
      case 1:
        return 'Đang xử lý';
      case 2:
        return 'Không thành công';
      case 3:
        return 'Thành công';
      default:
        return '';
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

  public getTypeNK(status: number | undefined): string {
    switch (status) {
      case 0:
        return 'Nhập kho (mua hàng)';
      case 1:
        return 'Nhập kho(nhân viên trả thiết bị)';
      case 2:
        return 'Nhập kho(Phòng ban trả thiết bị)';
      case 3:
        return 'Khác';
      default:
        return '';
    }
  }

  public getTypeXK(status: number | undefined): string {
    switch (status) {
      case 0:
        return 'Xuất kho(bán hàng)';
      case 1:
        return 'Xuất kho(nhân viên mượn thiết bị)';
      case 2:
        return 'Xuất kho(cho phòng ban)';
      case 3:
        return 'Khác';
      default:
        return '';
    }
  }
}

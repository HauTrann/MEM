import { Injectable } from '@angular/core';
import { TechnicalDataModel } from 'app/entities/equipment/technical-data.model';
import { createRequestOption } from 'app/shared/util/request-util';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private http: HttpClient, private translate: TranslateService, private datepipe: DatePipe, private toastr: ToastrService) {}

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

  // endregion
  /*
   * Author Hautv
   * Get flie báo cáo
   * */
  public getCustomerReportPDF(req?: any, isDownload?: boolean): void {
    const options = createRequestOption(req);
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    const respone = this.http.get(SERVER_API_URL + 'api/report-pdf', {
      params: options,
      observe: 'response',
      headers,
      responseType: 'blob'
    });
    respone.subscribe(response => {
      // this.showReport(response);
      const file = new Blob([response.body ? response.body : ''], { type: 'application/pdf' });
      const fileURL = window.URL.createObjectURL(file);
      if (isDownload) {
        const link = document.createElement('a');
        document.body.appendChild(link);
        link.download = fileURL;
        link.setAttribute('style', 'display: none');
        const name = 'ten_bao_cao.pdf';
        link.setAttribute('download', name);
        link.href = fileURL;
        link.click();
      } else {
        const contentDispositionHeader = response.headers.get('Content-Disposition');
        const result = contentDispositionHeader
          ? contentDispositionHeader
          : ''
              .split(';')[1]
              .trim()
              .split('=')[1];
        const newWin = window.open(fileURL, '_blank');
        // add a load listener to the window so that the title gets changed on page load

        newWin?.addEventListener('load', () => {
          newWin.document.title = result.replace(/"/g, '');
          // this.router.navigate(['/report/buy']);
        });
      }
    });
  }
}

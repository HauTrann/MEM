import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilsService } from 'app/entities/utils/utils.service';
import { Moment } from 'moment';
import { Report } from 'app/shared/constants/app.constants';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import * as moment from 'moment';

@Component({
  selector: 'jhi-report',
  templateUrl: './report.component.html',
  styleUrls: ['report.component.scss']
})
export class ReportComponent implements OnInit {
  @ViewChild('content') public modalComponent?: NgbModalRef;
  fromDate?: Moment;
  toDate?: Moment;
  Report = Report;
  modalRef?: NgbModalRef;
  type?: string;

  constructor(public utilsServcie: UtilsService, protected modalService: NgbModal) {}

  ngOnInit(): void {}

  getReport(type: string): void {
    this.type = type;
    this.modalRef = this.modalService.open(this.modalComponent, { backdrop: 'static' });
  }

  close(): void {
    if (this.modalRef) {
      this.modalRef.close();
      this.modalRef = undefined;
    }
  }

  viewPDF(): void {
    if (this.modalRef) {
      this.modalRef.close();
      this.modalRef = undefined;
    }
    switch (this.type) {
      case 'SO_THEO_DOI_DAU_TU':
        this.viewSoTheoDoiDauKy();
        break;
      case 'CHI_TIET_NHAP_KHO':
        this.viewSoTheoDoiDauKy();
        break;
      case 'CHI_TIET_XUAT_KHO':
        this.viewSoTheoDoiDauKy();
        break;
      case 'TONG_HOP_TON_KHO':
        this.viewSoTheoDoiDauKy();
        break;
      case 'TONG_HOP_CHI_TIET_TON_KHO':
        this.viewSoTheoDoiDauKy();
        break;
      default:
        break;
    }
  }

  viewSoTheoDoiDauKy(): void {
    this.utilsServcie.getCustomerReportPDF(
      {
        fromDate: this.fromDate ? this.fromDate : '',
        toDate: this.toDate ? this.toDate : moment(new Date()).format(DATE_FORMAT),
        typeID: this.type
      },
      false
    );
  }
}

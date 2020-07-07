import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IInOutRepository } from 'app/shared/model/in-out-repository.model';
import { InOutRepositoryService } from './in-out-repository.service';
import { IInOutRepositoryDetails, InOutRepositoryDetails } from 'app/shared/model/in-out-repository-details.model';
import { IRepository } from 'app/shared/model/repository.model';
import { RepositoryService } from 'app/entities/repository/repository.service';
import { DeviceModel } from 'app/entities/in-out-repository/device.model';
import { EquipmentService } from 'app/entities/equipment/equipment.service';
import * as moment from 'moment';
import { RequestReceiveDeviceService } from 'app/entities/request-receive-device/request-receive-device.service';
import { UtilsService } from 'app/entities/utils/utils.service';
import { User } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { RepositoryLedgerService } from 'app/entities/repository-ledger/repository-ledger.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { IDepartment } from 'app/shared/model/department.model';
import { DepartmentService } from 'app/entities/department/department.service';
import { AccountService } from 'app/core/auth/account.service';
import { ITechnicalDataTimeLine } from 'app/shared/model/technical-data-time-line.model';

@Component({
  selector: 'jhi-in-out-repository-update',
  templateUrl: './in-out-repository-update.component.html',
  styleUrls: ['in-out-repository.scss']
})
export class InOutRepositoryUpdateComponent implements OnInit {
  @ViewChild('content') public modalComponent?: NgbModalRef;
  isSaving = false;
  dateDp: any;
  postedDateDp: any;
  isNhapKho?: boolean;
  inOutRepositoryDetails: InOutRepositoryDetails[] = [];
  repositorys?: IRepository[] | null;
  deviceModels?: DeviceModel[] | null;
  inOutRepository: IInOutRepository = {};
  isFromRecive?: boolean;
  isFromPay?: boolean;
  idRef: any = [];
  types: any[] = [];
  users: User[] | null = null;
  modalRef?: NgbModalRef;
  rowSelect?: IInOutRepositoryDetails;
  departments: IDepartment[] | null = [];
  dateNow = moment(new Date());
  idprod?: number;
  serial?: string;

  constructor(
    protected inOutRepositoryService: InOutRepositoryService,
    protected activatedRoute: ActivatedRoute,
    protected repositoryService: RepositoryService,
    protected equipmentService: EquipmentService,
    public utilsService: UtilsService,
    private userService: UserService,
    private repositoryLedgerService: RepositoryLedgerService,
    protected requestReceiveDeviceService: RequestReceiveDeviceService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private departmentService: DepartmentService,
    private accountService: AccountService
  ) {
    this.isNhapKho = window.location.href.includes('in-out-repository/in');
    repositoryService.query().subscribe(res => {
      this.repositorys = res.body;
    });

    if (this.isNhapKho) {
      equipmentService.findAllDevice().subscribe(res => {
        this.deviceModels = res.body;
      });
    } else {
      equipmentService.findAll().subscribe(res => {
        this.deviceModels = res.body;
      });
    }

    this.departmentService.getAll().subscribe(res => {
      this.departments = res.body;
    });
    this.isFromRecive = window.location.href.includes('/from-receive');
    this.isFromPay = window.location.href.includes('/from-pay');
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((inOutRepository: any) => {
      if (inOutRepository.inOutRepository.id) {
        this.inOutRepository = inOutRepository.inOutRepository;
        this.inOutRepositoryDetails = this.inOutRepository.inOutRepositoryDetails ? this.inOutRepository.inOutRepositoryDetails : [];
      } else {
        this.inOutRepository = inOutRepository.inOutRepository;
        this.accountService.identity().subscribe(account => {
          if (!account) {
            // this.inOutRepository.deliver
          }
        });

        this.inOutRepository.date = moment(moment.now());
        this.inOutRepository.postedDate = moment(moment.now());
        this.inOutRepositoryService.count({ typeNo: this.isNhapKho ? 0 : 1 }).subscribe(res => {
          this.inOutRepository.no = (this.isNhapKho ? 'NK' : 'XK') + this.utilsService.pad(String(res.body + 1), 6);
        });
      }
      if (this.isFromPay) {
        this.isNhapKho = true;
        this.inOutRepository.type = 1;
        this.idRef = Number(this.activatedRoute.snapshot.paramMap.get('payID'));
      }
      if (this.isFromRecive) {
        this.isNhapKho = false;
        setTimeout(n => {
          this.inOutRepository.type = 1;
        }, 100);
        this.idRef = Number(this.activatedRoute.snapshot.paramMap.get('receiveID'));
      }
      if (this.isFromPay || this.isFromRecive) {
        this.setDataFromRef();
      }
    });
    this.userService
      .queryEmployee({
        page: 0,
        size: 999,
        sort: ['login,asc']
      })
      .subscribe((res: HttpResponse<User[]>) => {
        this.users = res.body;
      });
  }

  setDataFromRef(): void {
    this.requestReceiveDeviceService.find(this.idRef).subscribe(res => {
      const dt = res.body?.requestReceiveDeviceDetails;
      this.inOutRepository.userID = res.body?.userID;
      if (dt) {
        dt.forEach(n => {
          if (this.deviceModels?.filter(d => !d.isMedicalSupplies).some(e => e.id === n.prodID)) {
            const qtt = n.quantity ? n.quantity : 0;
            for (let i = 0; i < qtt; i++) {
              this.inOutRepositoryDetails.push({});
              this.inOutRepositoryDetails[i].prodID = n.prodID;
              this.inOutRepositoryDetails[i].serial = n.serial;
              this.inOutRepositoryDetails[i].quantity = 1;
              this.inOutRepositoryDetails[i].prodName = n.prodName;
              this.inOutRepositoryDetails[i].unit = n.unit;
            }
          } else {
            this.inOutRepositoryDetails.push({});
            this.inOutRepositoryDetails[this.inOutRepositoryDetails.length - 1].prodID = n.prodID;
            this.inOutRepositoryDetails[this.inOutRepositoryDetails.length - 1].quantity = n.quantity;
            this.inOutRepositoryDetails[this.inOutRepositoryDetails.length - 1].serial = n.serial;
            this.inOutRepositoryDetails[this.inOutRepositoryDetails.length - 1].prodName = n.prodName;
            this.inOutRepositoryDetails[this.inOutRepositoryDetails.length - 1].unit = n.unit;
          }
        });
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    if (this.checkErr()) {
      this.isSaving = true;
      this.inOutRepository.inOutRepositoryDetails = this.inOutRepositoryDetails;
      if (this.isNhapKho) {
        this.inOutRepository.outOfStock = false;
      } else {
        this.inOutRepository.outOfStock = true;
      }
      if (this.inOutRepository?.id !== undefined) {
        this.subscribeToSaveResponse(this.inOutRepositoryService.update(this.inOutRepository));
      } else {
        this.subscribeToSaveResponse(this.inOutRepositoryService.create(this.inOutRepository));
      }
    }
  }

  checkErr(): boolean {
    const check = this.deviceModels?.filter(n => !n.isMedicalSupplies);
    if (this.inOutRepositoryDetails.some(n => !n.prodID)) {
      this.toastr.warning('Bạn chưa chọn thiết bị');
      return false;
    }
    if (this.inOutRepositoryDetails.some(n => !n.serial && check?.some(m => m.id === n.prodID))) {
      this.toastr.warning('Bạn chưa nhập số serial cho thiết bị y tế');
      return false;
    }
    if (this.isNhapKho) {
      if (!this.inOutRepository.type && this.inOutRepository.type !== 0) {
        this.toastr.warning('Bạn chưa chọn loại nhập kho');
        return false;
      }
      const lstDV = this.deviceModels?.filter(n => !n.isMedicalSupplies);
      const dv = this.inOutRepositoryDetails.filter(n => lstDV?.some(m => n.prodID === m.id));
      if (dv.some(n => !n.technicalDataModel || n.technicalDataModel.length === 0)) {
        this.toastr.warning('Bạn chưa nhập thông số kỹ thuật thiết bị hiện tại');
        return false;
      }
    } else {
      if (!this.inOutRepository.type && this.inOutRepository.type !== 0) {
        this.toastr.warning('Bạn chưa chọn loại xuất kho');
        return false;
      }
      const lstDV = this.deviceModels?.filter(n => !n.isMedicalSupplies);
      const dv = this.inOutRepositoryDetails.filter(n => lstDV?.some(m => n.prodID === m.id));
      if (dv.some(n => !n.technicalDataModel || n.technicalDataModel.length === 0)) {
        this.toastr.warning('Bạn chưa nhập thông số kỹ thuật thiết bị hiện tại');
        return false;
      }
    }
    if (!this.inOutRepositoryDetails.length) {
      this.toastr.warning('Bạn chưa nhập thông thông tin chi tiết');
      return false;
    }
    return true;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInOutRepository>>): void {
    result.subscribe(
      res => this.onSaveSuccess(res.body),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(resRS: IInOutRepository | null): void {
    /*this.inOutRepository = result;
    this.record(this.inOutRepository);*/
    if (this.isFromPay || this.isFromRecive) {
      if (resRS?.recorded) {
        this.requestReceiveDeviceService.find(this.idRef).subscribe(res => {
          const ud = res.body ? res.body : {};
          ud.status = 3;
          ud.dateOfDelivery = moment(moment.now());
          this.requestReceiveDeviceService.update(ud).subscribe(resU => {});
        });
      } else {
        this.toastr.error('Xử lý không thành công, không thể xuất quá tồn kho');
      }
    } else {
      if (!resRS?.recorded) {
        this.toastr.error('Ghi sổ không thành công, không thể xuất quá tồn kho');
      }
    }
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  newArr(lenght: number): any[] {
    if (lenght > 0) {
      return new Array(lenght);
    } else {
      return new Array(0);
    }
  }

  addNewRow(): void {
    this.inOutRepositoryDetails?.push({});
  }

  addNewRowTechnical(): void {
    if (!this.rowSelect?.technicalDataModel) {
      this.rowSelect ? (this.rowSelect.technicalDataModel = []) : '';
    }
    this.rowSelect?.technicalDataModel?.push({
      time: this.dateNow,
      equipmentID: this.idprod,
      serial: this.serial
    });
  }

  removeRow(detail: any): void {
    this.inOutRepositoryDetails?.splice(this.inOutRepositoryDetails.indexOf(detail), 1);
  }

  removeRowTechnical(detail: any): void {
    this.rowSelect?.technicalDataModel?.splice(this.rowSelect?.technicalDataModel?.indexOf(detail), 1);
  }

  quantityChange(detail: InOutRepositoryDetails): void {
    detail.amount = (detail.quantity ? detail.quantity : 0) * (detail.unitPrice ? detail.unitPrice : 0);
  }

  unitPriceChange(detail: InOutRepositoryDetails): void {
    detail.amount = (detail.quantity ? detail.quantity : 0) * (detail.unitPrice ? detail.unitPrice : 0);
  }

  deviceChange(detail: InOutRepositoryDetails): void {
    const prd = this.deviceModels?.find(n => n.id === detail.prodID);
    detail.prodName = prd?.name;
    detail.serial = prd?.serial;
    this.equipmentService.find(detail.prodID ? detail.prodID : -1).subscribe(res => {
      detail.technicalDataModel = res.body?.technicalData;
      if (detail.technicalDataModel) {
        detail.technicalDataModel.forEach(n => {
          n.id = undefined;
        });
      }
    });
  }

  typeChange(): void {}

  sumDT(prop: string): number {
    let total = 0;
    for (let i = 0; i < this.inOutRepositoryDetails?.length; i++) {
      total += this.inOutRepositoryDetails[i][prop];
    }
    return isNaN(total) ? 0 : total;
  }

  searchcountry(term: string, item: any): boolean {
    term = term.toLocaleLowerCase();
    return item.code.toLocaleLowerCase().indexOf(term) > -1 || item.name.toLocaleLowerCase().includes(term);
  }

  record(inOutRepository: IInOutRepository): void {
    this.repositoryLedgerService.record(inOutRepository.id).subscribe((res: HttpResponse<any>) => {
      if (res.body.status === 1) {
        inOutRepository.recorded = true;
      }
    });
  }

  addThongSoKyThuat(detail: IInOutRepositoryDetails): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
    this.rowSelect = detail;
    if (!detail.serial) {
      this.toastr.warning('Bạn chưa nhập serial thiết bị');
      return;
    }
    if (detail.prodID) {
      this.idprod = detail.prodID;
      this.serial = detail.serial;
      this.modalRef = this.modalService.open(this.modalComponent, { backdrop: 'static' });
    }
  }

  closeContent(): void {
    if (this.modalRef) {
      this.modalRef.close();
    }
    if (this.rowSelect) {
      this.rowSelect.technicalDataModel?.forEach(n => (n.time = this.dateNow));
    }
  }

  getIsVT(id: number): any {
    const pr = this.deviceModels?.find(n => n.id === id);
    if (pr) {
      return pr.isMedicalSupplies ? pr.isMedicalSupplies : false;
    } else {
      return false;
    }
  }
}
